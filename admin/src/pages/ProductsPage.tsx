import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { Pencil, Plus, Trash2, Sparkles } from 'lucide-react';
import adminApi from '../api/client';
import type { Product } from '../types';

// Categories must match backend seed data
const categories = [
  'Bags',
  'Electronics',
  'Home',
  'Shoes'
];

const emptyProduct = {
  name: '',
  description: '',
  price: '',
  salePrice: '',
  category: '',
  stock: '',
  images: '',
  tags: '',
  isFeatured: false,
};

type FormValues = typeof emptyProduct;

const ProductsPage = () => {
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [editing, setEditing] = useState<Product | null>(null);
  const [generatingDesc, setGeneratingDesc] = useState(false);
  const queryClient = useQueryClient();

  const { data, isLoading } = useQuery({
    queryKey: ['admin-products'],
    queryFn: async () => {
      const { data: response } = await adminApi.get<{ products: Product[] }>('/products', {
        params: { limit: 100 },
      });
      return response.products;
    },
  });

  const form = useForm<FormValues>({ defaultValues: emptyProduct });

  const saveProduct = useMutation({
    mutationFn: (payload: Partial<Product>) =>
      editing ? adminApi.put(`/products/${editing._id}`, payload) : adminApi.post('/products', payload),
    onSuccess: async () => {
      await queryClient.invalidateQueries({ queryKey: ['admin-products'] });
      setDrawerOpen(false);
      setEditing(null);
      form.reset(emptyProduct);
    },
  });

  const deleteProduct = useMutation({
    mutationFn: (id: string) => adminApi.delete(`/products/${id}`),
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ['admin-products'] }),
  });

  const openDrawer = (product?: Product) => {
    if (product) {
      setEditing(product);
      form.reset({
        name: product.name,
        description: product.description,
        price: String(product.price),
        salePrice: product.salePrice ? String(product.salePrice) : '',
        category: product.category ?? '',
        stock: String(product.stock ?? 0),
        images: product.images?.join(', ') ?? '',
        tags: product.tags?.join(', ') ?? '',
        isFeatured: Boolean(product.isFeatured),
      });
    } else {
      setEditing(null);
      form.reset(emptyProduct);
    }
    setDrawerOpen(true);
  };

  const generateDescription = async () => {
    const name = form.getValues('name');
    const category = form.getValues('category');
    const tags = form.getValues('tags');

    if (!name) {
      alert('Please enter a product name first');
      return;
    }

    setGeneratingDesc(true);
    try {
      const apiKey = import.meta.env.VITE_HF_API_KEY;
      if (!apiKey || apiKey === 'your_huggingface_api_key_here') {
        throw new Error('Hugging Face API key is not configured. Please add VITE_HF_API_KEY to your .env file.');
      }

      // Use Serverless Inference API with OpenAI compatibility
      const response = await fetch(
        'https://api-inference.huggingface.co/v1/chat/completions',
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${apiKey}`
          },
          body: JSON.stringify({
            model: 'Qwen/Qwen2.5-72B-Instruct',
            messages: [
              {
                role: 'user',
                content: `Write a compelling product description for an e-commerce website.

Product Name: ${name}
Category: ${category || 'General'}
Tags: ${tags || 'N/A'}

Requirements:
- 2-3 paragraphs (100-150 words total)
- Highlight key features and benefits
- Use persuasive, engaging language
- SEO-friendly with natural keywords
- Professional tone suitable for online shopping

Write only the description, no extra formatting or labels.`
              }
            ],
            max_tokens: 250,
            temperature: 0.7
          })
        }
      );

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error?.message || data.message || 'Failed to generate description');
      }

      const description = data.choices?.[0]?.message?.content || '';
      form.setValue('description', description.trim());
    } catch (error) {
      console.error('AI Generation Error:', error);
      alert('Failed to generate description. Please try again.');
    } finally {
      setGeneratingDesc(false);
    }
  };

  const onSubmit = form.handleSubmit(async (values) => {
    const payload: Partial<Product> = {
      name: values.name,
      description: values.description,
      price: Number(values.price),
      salePrice: values.salePrice ? Number(values.salePrice) : undefined,
      category: values.category,
      stock: Number(values.stock || 0),
      images: values.images ? values.images.split(',').map((img) => img.trim()).filter(Boolean) : [],
      tags: values.tags ? values.tags.split(',').map((tag) => tag.trim()).filter(Boolean) : [],
      isFeatured: values.isFeatured,
    };
    await saveProduct.mutateAsync(payload);
  });

  return (
    <section>
      <div className="section-heading">
        <div>
          <p className="eyebrow text-secondary">Products</p>
          <h3 className="text-display font-bold text-primary">Catalog management</h3>
        </div>
        <button type="button" className="btn btn-primary" onClick={() => openDrawer()}>
          <Plus size={18} />
          New product
        </button>
      </div>
      {isLoading ? (
        <div className="page-center">
          <div className="spinner" />
          <p className="text-muted text-sm mt-4">Loading products…</p>
        </div>
      ) : (
        <div className="data-table product-table mt-4" style={{ marginTop: '1.5rem' }}>
          <div className="table-head">
            <span>Name</span>
            <span>Category</span>
            <span>Price</span>
            <span>Stock</span>
            <span>Featured</span>
            <span>Actions</span>
          </div>
          {data?.length === 0 ? (
            <div className="p-8 text-center text-muted text-body" style={{ padding: '2rem', textAlign: 'center', color: 'var(--color-outline)' }}>
              No products available.
            </div>
          ) : (
            data?.map((product) => (
              <div key={product._id} className="table-row">
                <span className="font-semibold text-primary">{product.name}</span>
                <span>{product.category}</span>
                <span className="font-bold">${product.salePrice ?? product.price}</span>
                <span>{product.stock}</span>
                <span>
                  {product.isFeatured ? (
                    <span className="badge badge-primary">Yes</span>
                  ) : (
                    <span className="badge badge-default">No</span>
                  )}
                </span>
                <div className="row-actions">
                  <button type="button" className="btn-icon" onClick={() => openDrawer(product)}>
                    <Pencil size={16} />
                  </button>
                  <button
                    type="button"
                    className="btn-icon"
                    onClick={() => deleteProduct.mutate(product._id)}
                    style={{ color: 'var(--color-on-surface-variant)', borderColor: 'var(--color-outline-variant)' }}
                  >
                    <Trash2 size={16} />
                  </button>
                </div>
              </div>
            ))
          )}
        </div>
      )}

      {drawerOpen && (
        <div className="drawer" onClick={(e) => {
          if (e.target === e.currentTarget) {
            setDrawerOpen(false);
            setEditing(null);
            form.reset(emptyProduct);
          }
        }}>
          <div className="drawer-card card">
            <div className="section-heading mb-6" style={{ marginBottom: '1.5rem' }}>
              <div>
                <p className="eyebrow text-secondary">{editing ? 'Edit product' : 'New product'}</p>
                <h3 className="text-display font-bold text-primary">{editing ? editing.name : 'Create a product'}</h3>
              </div>
              <button
                type="button"
                className="btn btn-ghost"
                onClick={() => {
                  setDrawerOpen(false);
                  setEditing(null);
                  form.reset(emptyProduct);
                }}
              >
                Close
              </button>
            </div>
            <form onSubmit={onSubmit} className="form-grid">
              <label className="full">
                <span>Product Name <span style={{ color: 'var(--color-error)' }}>*</span></span>
                <input type="text" placeholder="Enter product name" {...form.register('name')} required />
              </label>

              <label className="full">
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                  <span>Description</span>
                  <button
                    type="button"
                    className="btn btn-sm"
                    style={{
                      background: 'var(--color-primary-fixed)',
                      color: 'var(--color-primary)',
                      fontSize: '0.75rem',
                      padding: '0.25rem 0.6rem',
                      display: 'flex',
                      alignItems: 'center',
                      gap: '0.25rem',
                      borderRadius: 'var(--radius-full)',
                      border: 'none',
                      cursor: 'pointer',
                      fontWeight: 600,
                    }}
                    onClick={generateDescription}
                    disabled={generatingDesc}
                  >
                    <Sparkles size={14} />
                    {generatingDesc ? 'Generating...' : 'Generate with AI'}
                  </button>
                </div>
                <textarea rows={6} placeholder="Describe your product..." {...form.register('description')} />
              </label>

              <label>
                <span>Price <span style={{ color: 'var(--color-error)' }}>*</span></span>
                <input type="number" step="0.01" min="0" placeholder="0.00" {...form.register('price')} required />
              </label>

              <label>
                <span>Sale Price</span>
                <input type="number" step="0.01" min="0" placeholder="0.00" {...form.register('salePrice')} />
              </label>

              <label>
                <span>Category</span>
                <select {...form.register('category')}>
                  <option value="">Select a category</option>
                  {categories.map((cat) => (
                    <option key={cat} value={cat}>
                      {cat}
                    </option>
                  ))}
                </select>
              </label>

              <label>
                <span>Stock</span>
                <input type="number" min="0" placeholder="0" {...form.register('stock')} />
              </label>

              <label className="full">
                <span>Image URLs</span>
                <textarea
                  rows={3}
                  placeholder="Enter image URLs separated by commas&#10;Example: https://image1.com, https://image2.com"
                  {...form.register('images')}
                />
                <small style={{ color: 'var(--color-outline)' }}>Separate multiple URLs with commas</small>
              </label>

              <label className="full">
                <span>Tags</span>
                <input
                  type="text"
                  placeholder="trending, sale, new-arrival"
                  {...form.register('tags')}
                />
                <small style={{ color: 'var(--color-outline)' }}>Separate tags with commas</small>
              </label>

              <label className="full toggle" style={{ marginTop: '0.5rem' }}>
                <input type="checkbox" {...form.register('isFeatured')} />
                <span style={{ display: 'flex', flexDirection: 'column', gap: '0.1rem' }}>
                  <strong>Mark as featured</strong>
                  <small style={{ color: 'var(--color-outline)' }}>Featured products appear on the homepage</small>
                </span>
              </label>

              <div className="full" style={{ display: 'flex', justifyContent: 'flex-end', gap: '0.75rem', marginTop: '1rem', paddingTop: '1.5rem', borderTop: '1px solid var(--color-outline-variant)' }}>
                <button
                  type="button"
                  className="btn btn-ghost"
                  onClick={() => {
                    setDrawerOpen(false);
                    setEditing(null);
                    form.reset(emptyProduct);
                  }}
                >
                  Cancel
                </button>
                <button type="submit" className="btn btn-primary" disabled={saveProduct.isPending}>
                  {saveProduct.isPending ? 'Saving…' : (editing ? 'Update Product' : 'Create Product')}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </section>
  );
};

export default ProductsPage;
