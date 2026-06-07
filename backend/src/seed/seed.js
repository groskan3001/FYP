/* eslint-disable no-console */
require('dotenv').config({ path: require('path').resolve(__dirname, '../../.env') });
const bcrypt = require('bcryptjs');
const connectDB = require('../config/db');
const User = require('../models/User');
const Product = require('../models/Product');
const Order = require('../models/Order');
const { products, users, orderTemplates } = require('./sampleData');

/* ─── helpers ─── */
const daysAgo = (n) => new Date(Date.now() - n * 24 * 60 * 60 * 1000);

/**
 * Build a statusTimeline array that makes sense for a given final status.
 * Each step is spaced ~1 day apart, ending at the createdAt date.
 */
const buildTimeline = (finalStatus, createdAt) => {
  const flow = ['pending', 'confirmed', 'packed', 'shipped', 'delivered'];
  const cancelFlow = ['pending', 'cancelled'];

  const steps = finalStatus === 'cancelled' ? cancelFlow : flow.slice(0, flow.indexOf(finalStatus) + 1);

  return steps.map((status, idx) => ({
    status,
    note: {
      pending: 'Order placed successfully.',
      confirmed: 'Order confirmed by warehouse.',
      packed: 'Items packed and ready for dispatch.',
      shipped: 'Handed over to courier.',
      delivered: 'Delivered to customer.',
      cancelled: 'Order cancelled.',
    }[status],
    changedAt: new Date(createdAt.getTime() + idx * 24 * 60 * 60 * 1000),
  }));
};

/* ─── main import ─── */
const importData = async () => {
  try {
    await connectDB();

    // Wipe existing data
    await Promise.all([Order.deleteMany(), Product.deleteMany(), User.deleteMany()]);
    console.log('✓ Cleared existing data.');

    // Insert users (hash passwords)
    const hashedUsers = await Promise.all(
      users.map(async (u) => ({
        ...u,
        passwordHash: await bcrypt.hash(u.password, 10),
        password: undefined, // don't store plain password
      }))
    );
    const insertedUsers = await User.insertMany(hashedUsers);
    console.log(`✓ Inserted ${insertedUsers.length} users.`);

    // Insert products
    const insertedProducts = await Product.insertMany(products);
    console.log(`✓ Inserted ${insertedProducts.length} products.`);

    // Build a slug → product map for order lookups
    const productBySlug = {};
    for (const p of insertedProducts) {
      productBySlug[p.slug] = p;
    }

    // Insert orders
    const orderDocs = orderTemplates.map((tpl) => {
      const user = insertedUsers[tpl.userIndex];
      const createdAt = daysAgo(tpl.daysAgo);

      const items = tpl.items.map(({ productSlug, quantity }) => {
        const p = productBySlug[productSlug];
        if (!p) throw new Error(`Product slug not found in seed: ${productSlug}`);
        return {
          product: p._id,
          name: p.name,
          image: p.images?.[0] ?? '',
          price: p.salePrice ?? p.price,
          quantity,
        };
      });

      const subtotal = items.reduce((sum, i) => sum + i.price * i.quantity, 0);
      const shippingFee = subtotal >= 5000 ? 0 : 200;
      const total = subtotal + shippingFee;

      return {
        user: user._id,
        items,
        subtotal,
        shippingFee,
        total,
        status: tpl.status,
        paymentStatus: tpl.paymentStatus,
        shippingAddress: tpl.shippingAddress,
        trackingNumber: tpl.trackingNumber ?? undefined,
        statusTimeline: buildTimeline(tpl.status, createdAt),
        createdAt,
        updatedAt: createdAt,
      };
    });

    const insertedOrders = await Order.insertMany(orderDocs);
    console.log(`✓ Inserted ${insertedOrders.length} orders.`);

    console.log('\n─── Seed complete ───');
    console.log('\nAdmin accounts:');
    users
      .filter((u) => u.role === 'admin')
      .forEach((u) => console.log(`  ${u.email}  /  ${u.password}`));
    console.log('\nCustomer accounts:');
    users
      .filter((u) => u.role === 'customer')
      .forEach((u) => console.log(`  ${u.email}  /  ${u.password}`));

    process.exit();
  } catch (error) {
    console.error('Seed failed:', error.message);
    process.exit(1);
  }
};

/* ─── destroy only ─── */
const destroyData = async () => {
  try {
    await connectDB();
    await Promise.all([Order.deleteMany(), Product.deleteMany(), User.deleteMany()]);
    console.log('✓ All data destroyed.');
    process.exit();
  } catch (error) {
    console.error(error);
    process.exit(1);
  }
};

const action = process.argv[2];
if (action === '--destroy') {
  destroyData();
} else {
  importData();
}
