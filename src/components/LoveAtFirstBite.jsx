// src/components/LoveAtFirstBite.jsx
import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

// ============================================
// CONSTANTS & DATA
// ============================================

// Online image sources (Unsplash curated food photography)
const IMAGES = {
  hero: 'https://images.unsplash.com/photo-1550617931-e17a7b70dce2?w=1200&q=80',
  hero2: 'https://images.unsplash.com/photo-1486427944299-d1955d23e34d?w=1200&q=80',
  cake: 'https://images.unsplash.com/photo-1578985545062-69928b1d9587?w=400&q=80',
  cupcake: 'https://images.unsplash.com/photo-1587393855524-087f83d95bc9?w=400&q=80',
  doughnut: 'https://images.unsplash.com/photo-1551024601-bec78aea704b?w=400&q=80',
  cookie: 'https://images.unsplash.com/photo-1499636136210-6f4ee915583e?w=400&q=80',
  dessertBox: 'https://images.unsplash.com/photo-1558301211-0d8c8ddee6ec?w=400&q=80',
  smallChops: 'https://images.unsplash.com/photo-1565299585323-38d6b0865b47?w=400&q=80',
  about: 'https://images.unsplash.com/photo-1509440159596-0249088772ff?w=600&q=80',
  gallery1: 'https://images.unsplash.com/photo-1588195538326-c5b1e9f80a1b?w=400&q=80',
  gallery2: 'https://images.unsplash.com/photo-1556911220-bda9f9f3f2b7?w=400&q=80',
  gallery3: 'https://images.unsplash.com/photo-1565958011703-44f9829ba187?w=400&q=80',
  gallery4: 'https://images.unsplash.com/photo-1571115177098-24ec42ed204d?w=400&q=80',
  gallery5: 'https://images.unsplash.com/photo-1464349095431-e9a21285b5f3?w=400&q=80',
  gallery6: 'https://images.unsplash.com/photo-1556905055-8f358a7a47b2?w=400&q=80',
  wedding: 'https://images.unsplash.com/photo-1535254973040-607b474cb50d?w=600&q=80',
  birthday: 'https://images.unsplash.com/photo-1535141192574-5d4897c12636?w=600&q=80',
  catering: 'https://images.unsplash.com/photo-1555244162-803834f70033?w=600&q=80',
};

// Product data
const PRODUCTS = [
  { id: 1, name: 'Luxury Cakes', desc: 'Rich, moist & layered with love', price: '$28', img: IMAGES.cake, badge: 'Best Seller' },
  { id: 2, name: 'Gourmet Cupcakes', desc: 'Perfectly frosted bites of heaven', price: '$4.50', img: IMAGES.cupcake, badge: 'New' },
  { id: 3, name: 'Artisan Doughnuts', desc: 'Glazed & filled with joy', price: '$3.75', img: IMAGES.doughnut, badge: 'Popular' },
  { id: 4, name: 'Homemade Cookies', desc: 'Chewy, crunchy, irresistible', price: '$2.50', img: IMAGES.cookie, badge: 'Family Favorite' },
  { id: 5, name: 'Dessert Boxes', desc: 'Curated sweet surprises', price: '$22', img: IMAGES.dessertBox, badge: 'Gift Special' },
  { id: 6, name: 'Small Chops', desc: 'Savory bites for any occasion', price: '$12', img: IMAGES.smallChops, badge: 'Party Hit' },
];

const FEATURES = [
  { icon: '🌿', title: 'Fresh Ingredients', desc: 'Sourced daily from local farms and organic suppliers.' },
  { icon: '❤️', title: 'Handmade With Love', desc: 'Every recipe crafted by our master pastry chefs.' },
  { icon: '🚚', title: 'Fast Delivery', desc: 'Freshness guaranteed, right to your door within hours.' },
  { icon: '🎨', title: 'Custom Orders', desc: 'Personalized creations for your special moments.' },
];

const TESTIMONIALS = [
  { name: 'Sarah Mitchell', text: 'Absolutely divine! The cakes are a work of art.', rating: 5, img: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=100&q=80', role: 'Wedding Client' },
  { name: 'James Anderson', text: 'Best doughnuts in town. My family loves them!', rating: 5, img: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&q=80', role: 'Regular Customer' },
  { name: 'Elena Rodriguez', text: 'Ordered a birthday cake and it was stunning!', rating: 5, img: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=100&q=80', role: 'Happy Parent' },
];

const MENU_CATEGORIES = ['All', 'Cakes', 'Pastries', 'Desserts', 'Snacks', 'Drinks'];
const MENU_ITEMS = [
  { name: 'Red Velvet Cake', desc: 'Cream cheese frosting, velvety crumb', price: '$32', cat: 'Cakes', img: IMAGES.cake },
  { name: 'Butter Croissant', desc: 'Buttery, flaky, golden perfection', price: '$4', cat: 'Pastries', img: IMAGES.gallery3 },
  { name: 'Tiramisu', desc: 'Coffee-soaked Italian classic', price: '$8', cat: 'Desserts', img: IMAGES.gallery5 },
  { name: 'Gourmet Nachos', desc: 'Loaded with cheese & jalapeños', price: '$11', cat: 'Snacks', img: IMAGES.smallChops },
  { name: 'Matcha Latte', desc: 'Smooth, earthy, refreshing', price: '$6', cat: 'Drinks', img: IMAGES.gallery6 },
  { name: 'Chocolate Fudge', desc: 'Decadent, rich, and unforgettable', price: '$38', cat: 'Cakes', img: IMAGES.wedding },
  { name: 'Macarons Box', desc: 'Colorful French delights', price: '$3.50', cat: 'Pastries', img: IMAGES.dessertBox },
  { name: 'Fruit Tart', desc: 'Fresh berries with vanilla custard', price: '$7', cat: 'Desserts', img: IMAGES.gallery4 },
];

const INITIAL_GALLERY = [
  { id: 1, type: 'image', src: IMAGES.gallery1, caption: 'Signature Red Velvet Cake' },
  { id: 2, type: 'image', src: IMAGES.gallery2, caption: 'Elegant Cupcake Tower' },
  { id: 3, type: 'image', src: IMAGES.gallery3, caption: 'Freshly Baked Croissants' },
  { id: 4, type: 'image', src: IMAGES.gallery4, caption: 'Fruit Tart Delight' },
  { id: 5, type: 'image', src: IMAGES.gallery5, caption: 'Classic Tiramisu' },
  { id: 6, type: 'video', src: 'https://img.icons8.com/color/96/000000/youtube-play.png', caption: 'Baking in Action - Watch Now' },
];

const SERVICES = [
  { icon: '🎂', title: 'Birthday Cakes', desc: 'Custom cakes for all ages.', image: IMAGES.birthday },
  { icon: '💍', title: 'Wedding Cakes', desc: 'Elegant, multi-tiered masterpieces.', image: IMAGES.wedding },
  { icon: '🍮', title: 'Dessert Catering', desc: 'Sweet tables and dessert bars.', image: IMAGES.dessertBox },
  { icon: '🏢', title: 'Corporate Orders', desc: 'Premium baked goods for meetings.', image: IMAGES.catering },
  { icon: '🎉', title: 'Event Catering', desc: 'Full-service for any occasion.', image: IMAGES.hero2 },
  { icon: '✨', title: 'Custom Orders', desc: 'Anything you dream up, we create.', image: IMAGES.gallery2 },
];

// ============================================
// CSS STYLES (all in one file)
// ============================================
const styles = `
  /* Google Fonts */
  @import url('https://fonts.googleapis.com/css2?family=Playfair+Display:ital,wght@0,400;0,600;0,700;1,400&family=Poppins:wght@300;400;500;600;700&display=swap');

  * {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
  }

  body {
    font-family: 'Poppins', sans-serif;
    background-color: #FFF8F0;
    color: #4A2C2A;
  }

  h1, h2, h3, h4, h5 {
    font-family: 'Playfair Display', serif;
  }

  .app-container {
    background-color: #FFF8F0;
    min-height: 100vh;
    overflow-x: hidden;
  }

  /* Colors */
  .bg-chocolate { background-color: #4A2C2A; }
  .bg-beige { background-color: #F5E6D3; }
  .bg-cream { background-color: #FFF8F0; }
  .text-chocolate { color: #4A2C2A; }
  .text-gold { color: #C68E4D; }
  .border-gold { border-color: #C68E4D; }

  /* Buttons */
  .btn-gold {
    background-color: #C68E4D;
    color: white;
    transition: all 0.2s ease;
    border: none;
    cursor: pointer;
  }
  .btn-gold:hover {
    background-color: #a8723a;
    transform: scale(1.02);
  }
  .btn-outline-gold {
    border: 2px solid #C68E4D;
    color: #4A2C2A;
    background: transparent;
    transition: all 0.2s ease;
    cursor: pointer;
  }
  .btn-outline-gold:hover {
    background-color: #C68E4D;
    color: white;
  }

  /* Cards */
  .card-shadow {
    box-shadow: 0 10px 25px -8px rgba(74, 44, 42, 0.12);
  }
  .testimonial-card {
    background: white;
    border-radius: 20px;
    padding: 1.5rem;
    box-shadow: 0 6px 18px rgba(74, 44, 42, 0.08);
  }
  .product-card {
    background: white;
    border-radius: 24px;
    overflow: hidden;
    transition: all 0.25s ease;
    box-shadow: 0 4px 12px rgba(0,0,0,0.04);
  }
  .product-card:hover {
    transform: translateY(-6px);
    box-shadow: 0 18px 30px -10px rgba(74, 44, 42, 0.15);
  }

  /* Section Title */
  .section-title {
    font-size: 2.2rem;
    font-weight: 600;
    letter-spacing: -0.02em;
    color: #4A2C2A;
  }
  .gold-underline {
    position: relative;
  }
  .gold-underline:after {
    content: '';
    display: block;
    width: 60px;
    height: 4px;
    background: #C68E4D;
    margin: 8px auto 0;
    border-radius: 4px;
  }

  /* Hero */
  .hero-gradient {
    background: linear-gradient(135deg, #F5E6D3 0%, #FFF8F0 100%);
  }

  /* Layout Utilities */
  .container {
    max-width: 1280px;
    margin: 0 auto;
    padding: 0 1rem;
  }
  @media (min-width: 640px) {
    .container { padding: 0 1.5rem; }
  }
  @media (min-width: 1024px) {
    .container { padding: 0 2rem; }
  }

  .flex { display: flex; }
  .flex-col { flex-direction: column; }
  .flex-wrap { flex-wrap: wrap; }
  .items-center { align-items: center; }
  .justify-center { justify-content: center; }
  .justify-between { justify-content: space-between; }
  .gap-1 { gap: 0.25rem; }
  .gap-2 { gap: 0.5rem; }
  .gap-3 { gap: 0.75rem; }
  .gap-4 { gap: 1rem; }
  .gap-6 { gap: 1.5rem; }
  .gap-8 { gap: 2rem; }

  .grid { display: grid; }
  .grid-cols-1 { grid-template-columns: 1fr; }
  .grid-cols-2 { grid-template-columns: 1fr 1fr; }
  .grid-cols-3 { grid-template-columns: 1fr 1fr 1fr; }

  .text-center { text-align: center; }
  .text-left { text-align: left; }

  .relative { position: relative; }
  .absolute { position: absolute; }
  .inset-0 { top: 0; right: 0; bottom: 0; left: 0; }
  .sticky { position: sticky; }
  .top-0 { top: 0; }
  .z-50 { z-index: 50; }

  .w-full { width: 100%; }
  .h-full { height: 100%; }
  .min-h-screen { min-height: 100vh; }
  .overflow-hidden { overflow: hidden; }
  .overflow-y-auto { overflow-y: auto; }

  .object-cover { object-fit: cover; }
  .rounded-full { border-radius: 9999px; }
  .rounded-2xl { border-radius: 1rem; }
  .rounded-3xl { border-radius: 1.5rem; }
  .rounded-xl { border-radius: 0.75rem; }

  .shadow-lg { box-shadow: 0 10px 15px -3px rgba(0,0,0,0.1); }
  .shadow-xl { box-shadow: 0 20px 25px -5px rgba(0,0,0,0.1); }

  .cursor-pointer { cursor: pointer; }
  .transition { transition: all 0.3s ease; }

  .hidden { display: none; }

  /* Responsive Grid */
  @media (min-width: 640px) {
    .sm\\:grid-cols-2 { grid-template-columns: 1fr 1fr; }
    .sm\\:flex-row { flex-direction: row; }
    .sm\\:text-xl { font-size: 1.25rem; }
    .sm\\:text-2xl { font-size: 1.5rem; }
    .sm\\:p-6 { padding: 1.5rem; }
  }
  @media (min-width: 768px) {
    .md\\:grid-cols-2 { grid-template-columns: 1fr 1fr; }
    .md\\:text-3xl { font-size: 1.875rem; }
    .md\\:text-4xl { font-size: 2.25rem; }
  }
  @media (min-width: 1024px) {
    .lg\\:flex { display: flex; }
    .lg\\:grid-cols-3 { grid-template-columns: 1fr 1fr 1fr; }
    .lg\\:grid-cols-4 { grid-template-columns: 1fr 1fr 1fr 1fr; }
    .lg\\:text-2xl { font-size: 1.5rem; }
    .lg\\:text-7xl { font-size: 4.5rem; }
    .lg\\:p-8 { padding: 2rem; }
    .lg\\:p-10 { padding: 2.5rem; }
    .lg\\:py-20 { padding-top: 5rem; padding-bottom: 5rem; }
  }

  .mt-1 { margin-top: 0.25rem; }
  .mt-2 { margin-top: 0.5rem; }
  .mt-3 { margin-top: 0.75rem; }
  .mt-4 { margin-top: 1rem; }
  .mt-6 { margin-top: 1.5rem; }
  .mt-8 { margin-top: 2rem; }
  .mt-12 { margin-top: 3rem; }
  .mt-16 { margin-top: 4rem; }

  .mb-2 { margin-bottom: 0.5rem; }
  .mb-3 { margin-bottom: 0.75rem; }
  .mb-4 { margin-bottom: 1rem; }
  .mb-6 { margin-bottom: 1.5rem; }
  .mb-8 { margin-bottom: 2rem; }
  .mb-12 { margin-bottom: 3rem; }

  .py-2 { padding-top: 0.5rem; padding-bottom: 0.5rem; }
  .py-3 { padding-top: 0.75rem; padding-bottom: 0.75rem; }
  .py-4 { padding-top: 1rem; padding-bottom: 1rem; }
  .py-8 { padding-top: 2rem; padding-bottom: 2rem; }
  .py-12 { padding-top: 3rem; padding-bottom: 3rem; }
  .py-16 { padding-top: 4rem; padding-bottom: 4rem; }
  .py-20 { padding-top: 5rem; padding-bottom: 5rem; }

  .px-2 { padding-left: 0.5rem; padding-right: 0.5rem; }
  .px-3 { padding-left: 0.75rem; padding-right: 0.75rem; }
  .px-4 { padding-left: 1rem; padding-right: 1rem; }
  .px-6 { padding-left: 1.5rem; padding-right: 1.5rem; }
  .px-8 { padding-left: 2rem; padding-right: 2rem; }

  .p-2 { padding: 0.5rem; }
  .p-3 { padding: 0.75rem; }
  .p-4 { padding: 1rem; }
  .p-6 { padding: 1.5rem; }
  .p-8 { padding: 2rem; }

  /* Text sizes */
  .text-xs { font-size: 0.75rem; }
  .text-sm { font-size: 0.875rem; }
  .text-base { font-size: 1rem; }
  .text-lg { font-size: 1.125rem; }
  .text-xl { font-size: 1.25rem; }
  .text-2xl { font-size: 1.5rem; }
  .text-3xl { font-size: 1.875rem; }
  .text-4xl { font-size: 2.25rem; }
  .text-5xl { font-size: 3rem; }
  .text-6xl { font-size: 3.75rem; }

  .font-light { font-weight: 300; }
  .font-normal { font-weight: 400; }
  .font-medium { font-weight: 500; }
  .font-semibold { font-weight: 600; }
  .font-bold { font-weight: 700; }

  .font-playfair { font-family: 'Playfair Display', serif; }
  .font-poppins { font-family: 'Poppins', sans-serif; }

  .leading-tight { line-height: 1.25; }
  .leading-relaxed { line-height: 1.625; }

  .truncate { overflow: hidden; text-overflow: ellipsis; white-space: nowrap; }
  .whitespace-nowrap { white-space: nowrap; }
  .break-all { word-break: break-all; }

  /* Aspect ratio */
  .aspect-square { aspect-ratio: 1/1; }

  /* Border */
  .border { border: 1px solid; }
  .border-t { border-top: 1px solid; }
  .border-b { border-bottom: 1px solid; }
  .border-cream\\/10 { border-color: rgba(255, 248, 240, 0.1); }
  .border-gold\\/20 { border-color: rgba(198, 142, 77, 0.2); }
  .border-gold\\/30 { border-color: rgba(198, 142, 77, 0.3); }
  .border-beige { border-color: #F5E6D3; }
  .border-cream\\/30 { border-color: rgba(255, 248, 240, 0.3); }
  .border-white { border-color: #FFFFFF; }

  /* Backdrop blur */
  .backdrop-blur-sm { backdrop-filter: blur(4px); }

  /* Transforms */
  .scale-110 { transform: scale(1.1); }
  .scale-105 { transform: scale(1.05); }
  .group-hover\\:scale-110:hover { transform: scale(1.1); }

  /* Opacity */
  .opacity-0 { opacity: 0; }
  .opacity-100 { opacity: 1; }
  .group-hover\\:opacity-100:hover { opacity: 1; }

  /* Animation */
  .animate-spin {
    animation: spin 1s linear infinite;
  }
  .animate-bounce {
    animation: bounce 1s infinite;
  }
  @keyframes spin {
    from { transform: rotate(0deg); }
    to { transform: rotate(360deg); }
  }
  @keyframes bounce {
    0%, 100% { transform: translateY(0); }
    50% { transform: translateY(-10px); }
  }

  /* Loading */
  .loading-spinner {
    border: 4px solid #C68E4D;
    border-top-color: transparent;
    border-radius: 50%;
    width: 64px;
    height: 64px;
    animation: spin 1s linear infinite;
  }

  /* Responsive text */
  @media (max-width: 640px) {
    .section-title { font-size: 1.8rem; }
    .text-5xl { font-size: 2.5rem; }
    .text-4xl { font-size: 2rem; }
    .text-3xl { font-size: 1.75rem; }
    .grid-cols-2 { grid-template-columns: 1fr; }
    .grid-cols-3 { grid-template-columns: 1fr 1fr; }
    .gap-6 { gap: 1rem; }
    .gap-8 { gap: 1.5rem; }
  }

  @media (min-width: 641px) and (max-width: 1023px) {
    .grid-cols-2 { grid-template-columns: 1fr 1fr; }
    .grid-cols-3 { grid-template-columns: 1fr 1fr 1fr; }
  }

  /* Gallery hover controls */
  .gallery-controls {
    position: absolute;
    inset: 0;
    background: rgba(0,0,0,0.5);
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 0.5rem;
    opacity: 0;
    transition: opacity 0.3s ease;
  }
  .gallery-item:hover .gallery-controls {
    opacity: 1;
  }
  .gallery-control-btn {
    padding: 0.375rem 0.5rem;
    border-radius: 9999px;
    background: rgba(255,255,255,0.2);
    color: white;
    border: none;
    cursor: pointer;
    transition: all 0.2s ease;
  }
  .gallery-control-btn:hover {
    background: white;
    color: #4A2C2A;
  }
  .gallery-control-btn.danger:hover {
    background: #ef4444;
    color: white;
  }

  /* Responsive Gallery */
  .gallery-grid {
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 1rem;
  }
  @media (min-width: 640px) {
    .gallery-grid {
      grid-template-columns: 1fr 1fr 1fr;
    }
  }
  @media (min-width: 1024px) {
    .gallery-grid {
      grid-template-columns: 1fr 1fr 1fr 1fr;
    }
  }
`;

// ============================================
// MAIN APP
// ============================================
const LoveAtFirstBite = () => {
  const [cart, setCart] = useState([]);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [activeTab, setActiveTab] = useState('home');
  const [galleryItems, setGalleryItems] = useState(INITIAL_GALLERY);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => setIsLoading(false), 500);
    return () => clearTimeout(timer);
  }, []);

  const addToCart = (product) => {
    setCart([...cart, product]);
    toast.success(`🍰 ${product.name} added to cart!`, {
      position: "bottom-right",
      autoClose: 2500,
      style: { background: '#4A2C2A', color: '#FFF8F0' }
    });
  };

  const addGalleryItem = (item) => {
    const newItem = { id: Date.now(), ...item };
    setGalleryItems([...galleryItems, newItem]);
    toast.success('🎨 Media added to gallery!');
  };

  const removeGalleryItem = (id) => {
    setGalleryItems(galleryItems.filter(item => item.id !== id));
    toast.info('🗑️ Media removed from gallery');
  };

  const updateGalleryCaption = (id, newCaption) => {
    setGalleryItems(galleryItems.map(item => 
      item.id === id ? { ...item, caption: newCaption } : item
    ));
  };

  const moveGalleryItem = (dragIndex, hoverIndex) => {
    const newItems = [...galleryItems];
    const [draggedItem] = newItems.splice(dragIndex, 1);
    newItems.splice(hoverIndex, 0, draggedItem);
    setGalleryItems(newItems);
  };

  const renderPage = () => {
    switch(activeTab) {
      case 'home': return <HomePage setActiveTab={setActiveTab} addToCart={addToCart} />;
      case 'about': return <AboutPage />;
      case 'menu': return <MenuPage addToCart={addToCart} />;
      case 'gallery': return <GalleryPage 
        galleryItems={galleryItems} 
        addGalleryItem={addGalleryItem}
        removeGalleryItem={removeGalleryItem}
        updateGalleryCaption={updateGalleryCaption}
        moveGalleryItem={moveGalleryItem}
      />;
      case 'services': return <ServicesPage />;
      case 'contact': return <ContactPage />;
      default: return <HomePage setActiveTab={setActiveTab} addToCart={addToCart} />;
    }
  };

  if (isLoading) {
    return (
      <div style={{ minHeight: '100vh', backgroundColor: '#FFF8F0', display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '0 1rem' }}>
        <div style={{ textAlign: 'center' }}>
          <div style={{ fontSize: '4rem', marginBottom: '1rem' }}>🍫</div>
          <div className="loading-spinner" style={{ margin: '0 auto' }}></div>
          <p style={{ marginTop: '1rem', color: '#4A2C2A', fontFamily: "'Playfair Display', serif", fontSize: '1.25rem' }}>Loading Love at First Bite...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="app-container">
      <style>{styles}</style>
      <ToastContainer />
      
      {/* Header */}
      <header style={{ 
        backgroundColor: '#4A2C2A', 
        color: '#FFF8F0', 
        position: 'sticky', 
        top: 0, 
        zIndex: 50, 
        boxShadow: '0 10px 15px -3px rgba(0,0,0,0.1)'
      }}>
        <div className="container" style={{ paddingTop: '0.75rem', paddingBottom: '0.75rem', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <div 
            style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', cursor: 'pointer' }}
            onClick={() => setActiveTab('home')}
          >
            <span style={{ fontSize: '1.5rem' }}>🍫</span>
            <span className="font-playfair" style={{ fontSize: '1.25rem', fontWeight: 600, letterSpacing: '0.025em', maxWidth: '120px', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
              Love at First Bite
            </span>
          </div>
          
          {/* Desktop nav */}
          <nav style={{ display: 'none', alignItems: 'center', gap: '1.5rem', fontSize: '0.875rem', fontWeight: 500 }}>
            {['Home','About','Menu','Gallery','Services','Contact'].map(item => (
              <button 
                key={item} 
                onClick={() => setActiveTab(item.toLowerCase())} 
                style={{ 
                  color: activeTab === item.toLowerCase() ? '#C68E4D' : '#FFF8F0',
                  background: 'none',
                  border: 'none',
                  cursor: 'pointer',
                  transition: 'color 0.3s ease',
                  position: 'relative'
                }}
                onMouseEnter={(e) => e.target.style.color = '#C68E4D'}
                onMouseLeave={(e) => e.target.style.color = activeTab === item.toLowerCase() ? '#C68E4D' : '#FFF8F0'}
              >
                {item}
                {activeTab === item.toLowerCase() && (
                  <div style={{ position: 'absolute', bottom: '-4px', left: 0, right: 0, height: '2px', backgroundColor: '#C68E4D' }} />
                )}
              </button>
            ))}
            <button className="btn-gold" style={{ padding: '0.5rem 1.25rem', borderRadius: '9999px', fontSize: '0.875rem', fontWeight: 600, display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
              🛍️ Order Now
            </button>
          </nav>
          
          {/* Mobile toggle */}
          <button 
            style={{ display: 'block', background: 'none', border: 'none', color: '#FFF8F0', fontSize: '1.5rem', cursor: 'pointer' }}
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          >
            {mobileMenuOpen ? '✕' : '☰'}
          </button>
        </div>
        
        {/* Mobile menu */}
        {mobileMenuOpen && (
          <div style={{ 
            backgroundColor: 'rgba(74, 44, 42, 0.98)', 
            padding: '1rem 1.5rem', 
            display: 'flex', 
            flexDirection: 'column', 
            gap: '0.75rem',
            borderTop: '1px solid rgba(255, 248, 240, 0.1)',
            maxHeight: '80vh',
            overflowY: 'auto'
          }}>
            {['Home','About','Menu','Gallery','Services','Contact'].map(item => (
              <button 
                key={item} 
                onClick={() => { setActiveTab(item.toLowerCase()); setMobileMenuOpen(false); }}
                style={{ 
                  textAlign: 'left', 
                  background: 'none', 
                  border: 'none', 
                  color: activeTab === item.toLowerCase() ? '#C68E4D' : '#FFF8F0',
                  fontSize: '1.125rem',
                  padding: '0.5rem 0',
                  borderBottom: '1px solid rgba(255, 248, 240, 0.05)',
                  cursor: 'pointer'
                }}
              >
                {item}
              </button>
            ))}
            <button className="btn-gold" style={{ width: '100%', padding: '0.75rem', borderRadius: '9999px', marginTop: '0.5rem', fontSize: '1rem', fontWeight: 600 }}>
              🛍️ Order Now
            </button>
          </div>
        )}
      </header>

      <main>{renderPage()}</main>

      {/* Footer */}
      <footer style={{ backgroundColor: '#4A2C2A', color: 'rgba(255, 248, 240, 0.8)', padding: '2rem 0', marginTop: '2rem' }}>
        <div className="container">
          <div style={{ display: 'grid', gridTemplateColumns: '1fr', gap: '1.5rem' }}>
            <div>
              <h4 className="font-playfair" style={{ fontSize: '1.25rem', color: '#FFF8F0', marginBottom: '0.75rem' }}>Love at First Bite</h4>
              <p style={{ fontStyle: 'italic', fontSize: '0.875rem' }}>"Every Bite Tells a Love Story."</p>
              <div style={{ display: 'flex', gap: '0.75rem', marginTop: '1rem', fontSize: '1.5rem' }}>
                <span style={{ cursor: 'pointer' }}>📸</span>
                <span style={{ cursor: 'pointer' }}>📘</span>
                <span style={{ cursor: 'pointer' }}>🐦</span>
                <span style={{ cursor: 'pointer' }}>▶️</span>
              </div>
            </div>
            <div>
              <h5 style={{ fontWeight: 600, color: '#FFF8F0' }}>Quick Links</h5>
              <ul style={{ fontSize: '0.875rem', listStyle: 'none', marginTop: '0.5rem' }}>
                {['About','Menu','Services','Contact'].map(i => 
                  <li key={i} style={{ cursor: 'pointer', padding: '0.25rem 0' }} onClick={() => setActiveTab(i.toLowerCase())}>
                    {i}
                  </li>
                )}
              </ul>
            </div>
            <div>
              <h5 style={{ fontWeight: 600, color: '#FFF8F0' }}>Contact</h5>
              <p style={{ fontSize: '0.875rem', marginTop: '0.5rem' }}>123 Baker Lane, Sweet City</p>
              <p style={{ fontSize: '0.875rem' }}>+1 234 567 8900</p>
              <p style={{ fontSize: '0.875rem', wordBreak: 'break-all' }}>hello@loveatfirstbite.com</p>
            </div>
            <div>
              <h5 style={{ fontWeight: 600, color: '#FFF8F0' }}>Hours</h5>
              <p style={{ fontSize: '0.875rem', marginTop: '0.5rem' }}>Mon - Sat: 8am - 8pm</p>
              <p style={{ fontSize: '0.875rem' }}>Sun: 9am - 6pm</p>
              <div style={{ marginTop: '0.5rem', display: 'flex', alignItems: 'center', gap: '0.5rem', color: '#C68E4D' }}>
                <span>✨</span>
                <span style={{ fontSize: '0.75rem' }}>Fresh daily</span>
              </div>
            </div>
          </div>
          <div style={{ textAlign: 'center', fontSize: '0.75rem', marginTop: '1.5rem', paddingTop: '1rem', borderTop: '1px solid rgba(255, 248, 240, 0.1)' }}>
            © 2026 Love at First Bite. All rights reserved. Made with ❤️ and lots of sugar.
          </div>
        </div>
      </footer>
    </div>
  );
};

// ============================================
// HOMEPAGE
// ============================================
const HomePage = ({ setActiveTab, addToCart }) => {
  return (
    <div>
      {/* Hero Section */}
      <section style={{ 
        position: 'relative',
        minHeight: '90vh',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        overflow: 'hidden'
      }}>
        <div style={{ 
          position: 'absolute',
          inset: 0,
          backgroundImage: `url(${IMAGES.hero})`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          filter: 'brightness(0.6)'
        }} />
        <div style={{ 
          position: 'absolute',
          inset: 0,
          background: 'linear-gradient(to bottom, rgba(74,44,42,0.4), rgba(74,44,42,0.8))'
        }} />
        
        <div style={{ 
          position: 'relative',
          zIndex: 10,
          textAlign: 'center',
          color: '#FFF8F0',
          maxWidth: '896px',
          padding: '2rem 1rem'
        }}>
          <div style={{ 
            display: 'inline-block',
            padding: '0.375rem 1.5rem',
            backgroundColor: 'rgba(198, 142, 77, 0.2)',
            backdropFilter: 'blur(4px)',
            borderRadius: '9999px',
            fontSize: '0.875rem',
            fontWeight: 500,
            marginBottom: '1.5rem',
            border: '1px solid rgba(198, 142, 77, 0.3)'
          }}>
            🍫 Since 2020
          </div>
          
          <h1 className="font-playfair" style={{ fontSize: '2.5rem', fontWeight: 700, marginBottom: '1.5rem', lineHeight: 1.25 }}>
            Love at First Bite
          </h1>
          
          <p style={{ fontSize: '1.125rem', color: 'rgba(255, 248, 240, 0.9)', maxWidth: '672px', margin: '0 auto 1.5rem', lineHeight: 1.625 }}>
            "Freshly baked pastries, cakes, desserts, and delicious meals crafted with love 
            and attention to every detail."
          </p>
          
          <div style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'center', gap: '0.75rem' }}>
            <button className="btn-gold" style={{ padding: '0.625rem 1.5rem', borderRadius: '9999px', fontSize: '1.125rem', fontWeight: 600, display: 'flex', alignItems: 'center', gap: '0.5rem', boxShadow: '0 20px 25px -5px rgba(0,0,0,0.1)' }}>
              🛍️ Order Now
            </button>
            <button 
              onClick={() => setActiveTab('menu')} 
              style={{ 
                backgroundColor: 'rgba(255,255,255,0.2)',
                backdropFilter: 'blur(4px)',
                color: '#FFF8F0',
                padding: '0.625rem 1.5rem',
                borderRadius: '9999px',
                fontSize: '1.125rem',
                fontWeight: 600,
                display: 'flex',
                alignItems: 'center',
                gap: '0.5rem',
                border: '1px solid rgba(255, 248, 240, 0.3)',
                cursor: 'pointer',
                transition: 'all 0.3s ease'
              }}
              onMouseEnter={(e) => e.target.style.backgroundColor = 'rgba(255,255,255,0.3)'}
              onMouseLeave={(e) => e.target.style.backgroundColor = 'rgba(255,255,255,0.2)'}
            >
              View Menu ▶️
            </button>
          </div>
          
          <div style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'center', gap: '1rem', marginTop: '2rem', fontSize: '0.875rem' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.375rem' }}>
              <span>✅</span>
              <span>100% Fresh</span>
            </div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.375rem' }}>
              <span>❤️</span>
              <span>Made with Love</span>
            </div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.375rem' }}>
              <span>🚚</span>
              <span>Fast Delivery</span>
            </div>
          </div>
        </div>
      </section>

      {/* Featured Products */}
      <section style={{ maxWidth: '1280px', margin: '0 auto', padding: '3rem 1rem' }}>
        <div style={{ textAlign: 'center', marginBottom: '2rem' }}>
          <h2 className="section-title gold-underline" style={{ display: 'inline-block' }}>Featured Products</h2>
          <p style={{ color: 'rgba(74, 44, 42, 0.7)', marginTop: '0.5rem' }}>Our most beloved creations, made fresh daily</p>
        </div>
        
        <div style={{ display: 'grid', gridTemplateColumns: '1fr', gap: '1rem' }}>
          {PRODUCTS.map((p, index) => (
            <div key={p.id} className="product-card">
              <div style={{ position: 'relative', overflow: 'hidden' }}>
                <img 
                  src={p.img} 
                  alt={p.name}
                  style={{ width: '100%', height: '12rem', objectFit: 'cover', transition: 'transform 0.5s ease' }}
                  loading="lazy"
                />
                {p.badge && (
                  <span style={{ position: 'absolute', top: '0.5rem', right: '0.5rem', backgroundColor: '#C68E4D', color: 'white', fontSize: '0.75rem', fontWeight: 600, padding: '0.125rem 0.75rem', borderRadius: '9999px' }}>
                    {p.badge}
                  </span>
                )}
              </div>
              <div style={{ padding: '1rem' }}>
                <h3 className="font-playfair" style={{ fontSize: '1.125rem', fontWeight: 600, color: '#4A2C2A' }}>{p.name}</h3>
                <p style={{ fontSize: '0.875rem', color: 'rgba(74, 44, 42, 0.7)', marginTop: '0.25rem' }}>{p.desc}</p>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginTop: '0.75rem' }}>
                  <span style={{ color: '#C68E4D', fontWeight: 700, fontSize: '1.25rem' }}>{p.price}</span>
                  <button 
                    onClick={() => addToCart(p)} 
                    className="btn-gold" 
                    style={{ padding: '0.375rem 1rem', borderRadius: '9999px', fontSize: '0.875rem', display: 'flex', alignItems: 'center', gap: '0.25rem' }}
                  >
                    🛍️ Add to Cart
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Why Choose Us */}
      <section style={{ backgroundColor: '#F5E6D3', padding: '3rem 1rem' }}>
        <div className="container">
          <div style={{ textAlign: 'center', marginBottom: '2rem' }}>
            <h2 className="section-title gold-underline" style={{ display: 'inline-block' }}>Why Choose Us</h2>
            <p style={{ color: 'rgba(74, 44, 42, 0.7)', marginTop: '0.5rem' }}>What makes every bite unforgettable</p>
          </div>
          
          <div style={{ display: 'grid', gridTemplateColumns: '1fr', gap: '1rem' }}>
            {FEATURES.map((f, i) => (
              <div key={i} style={{ backgroundColor: 'white', padding: '1rem', borderRadius: '1rem', textAlign: 'center', boxShadow: '0 10px 25px -8px rgba(74, 44, 42, 0.12)' }}>
                <div style={{ fontSize: '3rem', marginBottom: '0.5rem' }}>{f.icon}</div>
                <h4 className="font-playfair" style={{ fontSize: '1.125rem', fontWeight: 600, color: '#4A2C2A' }}>{f.title}</h4>
                <p style={{ fontSize: '0.875rem', color: 'rgba(74, 44, 42, 0.7)', marginTop: '0.25rem' }}>{f.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* About + Gallery Preview */}
      <div className="container" style={{ padding: '3rem 1rem', display: 'grid', gap: '2rem' }}>
        <div>
          <h2 className="section-title gold-underline" style={{ fontSize: '1.875rem' }}>About Us</h2>
          <p style={{ marginTop: '0.75rem', fontSize: '1rem', color: 'rgba(74, 44, 42, 0.8)', lineHeight: 1.625 }}>
            At Love at First Bite, we believe every dessert tells a story. Our passion for baking 
            is matched only by our commitment to quality and creativity.
          </p>
          <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-start', gap: '1rem', marginTop: '1rem' }}>
            <button onClick={() => setActiveTab('about')} className="btn-gold" style={{ padding: '0.5rem 1.5rem', borderRadius: '9999px' }}>
              Learn More
            </button>
            <div style={{ display: 'flex' }}>
              {['👩','🧑','👩‍🦰','👨'].map((emoji, i) => (
                <span key={i} style={{ fontSize: '1.5rem', border: '2px solid white', borderRadius: '9999px', backgroundColor: '#F5E6D3', padding: '0.125rem', marginLeft: i > 0 ? '-0.5rem' : 0 }}>{emoji}</span>
              ))}
            </div>
          </div>
        </div>
        
        <div>
          <h2 className="section-title gold-underline" style={{ fontSize: '1.875rem' }}>Gallery</h2>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: '0.5rem', marginTop: '0.75rem' }}>
            {[IMAGES.gallery1, IMAGES.gallery2, IMAGES.gallery3, IMAGES.gallery4, IMAGES.gallery5, IMAGES.gallery6].map((img, i) => (
              <div key={i} style={{ borderRadius: '0.5rem', overflow: 'hidden', boxShadow: '0 4px 6px -1px rgba(0,0,0,0.1)', aspectRatio: '1/1' }}>
                <img src={img} alt={`Gallery ${i+1}`} style={{ width: '100%', height: '100%', objectFit: 'cover' }} loading="lazy" />
              </div>
            ))}
          </div>
          <button onClick={() => setActiveTab('gallery')} className="btn-outline-gold" style={{ marginTop: '0.75rem', padding: '0.375rem 1.5rem', borderRadius: '9999px' }}>
            View Full Gallery →
          </button>
        </div>
      </div>

      {/* Testimonials */}
      <section style={{ backgroundColor: '#F5E6D3', padding: '3rem 1rem' }}>
        <div className="container">
          <div style={{ textAlign: 'center', marginBottom: '2rem' }}>
            <h2 className="section-title gold-underline" style={{ display: 'inline-block' }}>What Our Customers Say</h2>
            <p style={{ color: 'rgba(74, 44, 42, 0.7)', marginTop: '0.5rem' }}>Real stories from real people</p>
          </div>
          
          <div style={{ display: 'grid', gridTemplateColumns: '1fr', gap: '1rem' }}>
            {TESTIMONIALS.map((t, i) => (
              <div key={i} className="testimonial-card" style={{ position: 'relative' }}>
                <span style={{ position: 'absolute', top: '0.75rem', right: '0.75rem', fontSize: '1.5rem', opacity: 0.2 }}>💬</span>
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                  <img src={t.img} alt={t.name} style={{ width: '2.5rem', height: '2.5rem', borderRadius: '9999px', objectFit: 'cover' }} />
                  <div>
                    <p style={{ fontWeight: 600, color: '#4A2C2A' }}>{t.name}</p>
                    <p style={{ fontSize: '0.75rem', color: 'rgba(74, 44, 42, 0.6)' }}>{t.role}</p>
                  </div>
                </div>
                <div style={{ color: '#C68E4D', marginTop: '0.25rem' }}>⭐⭐⭐⭐⭐</div>
                <p style={{ marginTop: '0.5rem', fontSize: '0.875rem', color: 'rgba(74, 44, 42, 0.8)', lineHeight: 1.625 }}>"{t.text}"</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
};

// ============================================
// ABOUT PAGE
// ============================================
const AboutPage = () => {
  return (
    <div className="container" style={{ padding: '2rem 1rem' }}>
      <div style={{ display: 'grid', gap: '2rem' }}>
        <div style={{ display: 'grid', gap: '1.5rem' }}>
          <div>
            <h1 className="font-playfair" style={{ fontSize: '2.25rem', fontWeight: 700, color: '#4A2C2A' }}>Our Story</h1>
            <p style={{ marginTop: '0.75rem', fontSize: '1.125rem', color: 'rgba(74, 44, 42, 0.8)', lineHeight: 1.625 }}>
              Founded in 2020, Love at First Bite was born from a dream to share joy through pastry. 
              Every recipe is a tribute to family traditions and the sweet moments that bring people together.
            </p>
            <p style={{ marginTop: '0.75rem', fontSize: '0.875rem', color: 'rgba(74, 44, 42, 0.7)' }}>
              What started as a small home bakery has grown into a beloved destination for those 
              seeking quality, creativity, and heart in every bite.
            </p>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: '0.5rem', marginTop: '1rem' }}>
              <div style={{ backgroundColor: '#F5E6D3', padding: '0.5rem', borderRadius: '0.75rem', textAlign: 'center' }}>
                <div style={{ fontSize: '1.25rem', fontWeight: 700, color: '#C68E4D' }}>500+</div>
                <div style={{ fontSize: '0.75rem', color: 'rgba(74, 44, 42, 0.6)' }}>Happy Clients</div>
              </div>
              <div style={{ backgroundColor: '#F5E6D3', padding: '0.5rem', borderRadius: '0.75rem', textAlign: 'center' }}>
                <div style={{ fontSize: '1.25rem', fontWeight: 700, color: '#C68E4D' }}>1000+</div>
                <div style={{ fontSize: '0.75rem', color: 'rgba(74, 44, 42, 0.6)' }}>Cakes Baked</div>
              </div>
              <div style={{ backgroundColor: '#F5E6D3', padding: '0.5rem', borderRadius: '0.75rem', textAlign: 'center' }}>
                <div style={{ fontSize: '1.25rem', fontWeight: 700, color: '#C68E4D' }}>4.9★</div>
                <div style={{ fontSize: '0.75rem', color: 'rgba(74, 44, 42, 0.6)' }}>Average Rating</div>
              </div>
            </div>
          </div>
          <div style={{ borderRadius: '1rem', overflow: 'hidden', boxShadow: '0 20px 25px -5px rgba(0,0,0,0.1)' }}>
            <img src={IMAGES.about} alt="Our Bakery" style={{ width: '100%', height: '16rem', objectFit: 'cover' }} loading="lazy" />
          </div>
        </div>
        
        <div style={{ display: 'grid', gap: '1rem' }}>
          <div style={{ backgroundColor: 'white', padding: '1.5rem', borderRadius: '1rem', boxShadow: '0 10px 25px -8px rgba(74, 44, 42, 0.12)' }}>
            <div style={{ fontSize: '2.25rem', marginBottom: '0.5rem' }}>🎯</div>
            <h3 className="font-playfair" style={{ fontSize: '1.25rem', fontWeight: 600, color: '#4A2C2A' }}>Mission</h3>
            <p style={{ fontSize: '0.875rem', color: 'rgba(74, 44, 42, 0.7)', marginTop: '0.5rem', lineHeight: 1.625 }}>
              To create unforgettable sweet experiences that celebrate life's special moments.
            </p>
          </div>
          <div style={{ backgroundColor: 'white', padding: '1.5rem', borderRadius: '1rem', boxShadow: '0 10px 25px -8px rgba(74, 44, 42, 0.12)' }}>
            <div style={{ fontSize: '2.25rem', marginBottom: '0.5rem' }}>👁️</div>
            <h3 className="font-playfair" style={{ fontSize: '1.25rem', fontWeight: 600, color: '#4A2C2A' }}>Vision</h3>
            <p style={{ fontSize: '0.875rem', color: 'rgba(74, 44, 42, 0.7)', marginTop: '0.5rem', lineHeight: 1.625 }}>
              To be the most beloved bakery, known for quality, creativity, and heart.
            </p>
          </div>
          <div style={{ backgroundColor: 'white', padding: '1.5rem', borderRadius: '1rem', boxShadow: '0 10px 25px -8px rgba(74, 44, 42, 0.12)' }}>
            <div style={{ fontSize: '2.25rem', marginBottom: '0.5rem' }}>💎</div>
            <h3 className="font-playfair" style={{ fontSize: '1.25rem', fontWeight: 600, color: '#4A2C2A' }}>Values</h3>
            <p style={{ fontSize: '0.875rem', color: 'rgba(74, 44, 42, 0.7)', marginTop: '0.5rem', lineHeight: 1.625 }}>
              Quality, Creativity, Community, and Love. These principles guide everything we do.
            </p>
          </div>
        </div>
        
        <div style={{ background: 'linear-gradient(to right, #F5E6D3, #FFF8F0)', padding: '1.5rem', borderRadius: '1.5rem', border: '1px solid rgba(198, 142, 77, 0.2)' }}>
          <h2 className="font-playfair" style={{ fontSize: '1.5rem', fontWeight: 600, color: '#4A2C2A' }}>Our Promise</h2>
          <p style={{ marginTop: '0.5rem', fontSize: '1rem', color: 'rgba(74, 44, 42, 0.8)', lineHeight: 1.625 }}>
            Every creation is made with the finest ingredients and a generous helping of passion. 
            We pour our hearts into every pastry, cake, and dessert we make.
          </p>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginTop: '0.75rem', color: '#C68E4D' }}>
            <span>❤️</span>
            <span style={{ fontWeight: 600 }}>Made with love, always.</span>
          </div>
        </div>
      </div>
    </div>
  );
};

// ============================================
// MENU PAGE
// ============================================
const MenuPage = ({ addToCart }) => {
  const [selectedCategory, setSelectedCategory] = useState('All');
  
  const filteredItems = selectedCategory === 'All' 
    ? MENU_ITEMS 
    : MENU_ITEMS.filter(item => item.cat === selectedCategory);

  return (
    <div className="container" style={{ padding: '2rem 1rem' }}>
      <div style={{ textAlign: 'center', marginBottom: '2rem' }}>
        <h1 className="font-playfair" style={{ fontSize: '2.25rem', fontWeight: 700, color: '#4A2C2A' }}>Our Menu</h1>
        <p style={{ color: 'rgba(74, 44, 42, 0.7)', marginTop: '0.5rem' }}>Handcrafted with love, made fresh daily</p>
      </div>
      
      <div style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'center', gap: '0.375rem', marginBottom: '1.5rem' }}>
        {MENU_CATEGORIES.map(cat => (
          <button
            key={cat}
            onClick={() => setSelectedCategory(cat)}
            style={{
              padding: '0.375rem 0.75rem',
              borderRadius: '9999px',
              fontSize: '0.75rem',
              fontWeight: 500,
              border: 'none',
              cursor: 'pointer',
              transition: 'all 0.3s ease',
              backgroundColor: selectedCategory === cat ? '#4A2C2A' : 'white',
              color: selectedCategory === cat ? '#FFF8F0' : '#4A2C2A',
              boxShadow: selectedCategory === cat ? '0 10px 15px -3px rgba(0,0,0,0.1)' : '0 1px 3px rgba(0,0,0,0.1)'
            }}
          >
            {cat}
          </button>
        ))}
      </div>
      
      <div style={{ display: 'grid', gridTemplateColumns: '1fr', gap: '1rem' }}>
        {filteredItems.map((item, index) => (
          <div key={index} style={{ backgroundColor: 'white', padding: '1rem', borderRadius: '1rem', boxShadow: '0 10px 25px -8px rgba(74, 44, 42, 0.12)', display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
            <img src={item.img} alt={item.name} style={{ width: '4rem', height: '4rem', borderRadius: '0.75rem', objectFit: 'cover' }} loading="lazy" />
            <div style={{ flex: 1 }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
                <h4 className="font-playfair" style={{ fontSize: '1rem', fontWeight: 600, color: '#4A2C2A' }}>{item.name}</h4>
                <span style={{ color: '#C68E4D', fontWeight: 700 }}>{item.price}</span>
              </div>
              <p style={{ fontSize: '0.75rem', color: 'rgba(74, 44, 42, 0.7)' }}>{item.desc}</p>
              <div style={{ display: 'flex', flexWrap: 'wrap', alignItems: 'center', gap: '0.5rem', marginTop: '0.25rem' }}>
                <span style={{ fontSize: '0.75rem', backgroundColor: '#F5E6D3', padding: '0.125rem 0.5rem', borderRadius: '9999px', color: 'rgba(74, 44, 42, 0.6)' }}>{item.cat}</span>
                <button 
                  onClick={() => addToCart(item)}
                  className="btn-gold" 
                  style={{ padding: '0.25rem 0.75rem', borderRadius: '9999px', fontSize: '0.75rem', display: 'flex', alignItems: 'center', gap: '0.25rem', marginLeft: 'auto' }}
                >
                  🛍️ Add
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

// ============================================
// GALLERY PAGE
// ============================================
const GalleryPage = ({ galleryItems, addGalleryItem, removeGalleryItem, updateGalleryCaption, moveGalleryItem }) => {
  const [newItemType, setNewItemType] = useState('image');
  const [newItemCaption, setNewItemCaption] = useState('');
  const [newItemUrl, setNewItemUrl] = useState('');
  const [isAdding, setIsAdding] = useState(false);

  const handleAddItem = () => {
    if (newItemCaption.trim() && newItemUrl.trim()) {
      addGalleryItem({
        type: newItemType,
        src: newItemUrl,
        caption: newItemCaption
      });
      setNewItemCaption('');
      setNewItemUrl('');
      setIsAdding(false);
    } else {
      toast.warning('Please fill in all fields');
    }
  };

  const moveUp = (index) => {
    if (index > 0) moveGalleryItem(index, index - 1);
  };
  const moveDown = (index) => {
    if (index < galleryItems.length - 1) moveGalleryItem(index, index + 1);
  };

  return (
    <div className="container" style={{ padding: '2rem 1rem' }}>
      <div style={{ display: 'flex', flexDirection: 'column', justifyContent: 'space-between', alignItems: 'flex-start', gap: '0.75rem', marginBottom: '1.5rem' }}>
        <div>
          <h1 className="font-playfair" style={{ fontSize: '2.25rem', fontWeight: 700, color: '#4A2C2A' }}>Gallery</h1>
          <p style={{ color: 'rgba(74, 44, 42, 0.7)', marginTop: '0.25rem' }}>Manage your photos and videos</p>
        </div>
        <button 
          onClick={() => setIsAdding(!isAdding)}
          className="btn-gold" 
          style={{ padding: '0.5rem 1.5rem', borderRadius: '9999px', display: 'flex', alignItems: 'center', gap: '0.5rem', width: '100%', justifyContent: 'center' }}
        >
          ➕ {isAdding ? 'Cancel' : 'Add Media'}
        </button>
      </div>

      {isAdding && (
        <div style={{ backgroundColor: 'white', padding: '1rem', borderRadius: '1.5rem', marginBottom: '1.5rem', boxShadow: '0 10px 25px -8px rgba(74, 44, 42, 0.12)' }}>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr', gap: '0.75rem' }}>
            <div>
              <label style={{ fontSize: '0.75rem', fontWeight: 500, color: '#4A2C2A' }}>Type</label>
              <select 
                value={newItemType}
                onChange={(e) => setNewItemType(e.target.value)}
                style={{ width: '100%', marginTop: '0.25rem', padding: '0.5rem 0.75rem', fontSize: '0.875rem', border: '1px solid #F5E6D3', borderRadius: '0.75rem', backgroundColor: '#FFF8F0' }}
              >
                <option value="image">Image</option>
                <option value="video">Video</option>
              </select>
            </div>
            <div>
              <label style={{ fontSize: '0.75rem', fontWeight: 500, color: '#4A2C2A' }}>Image URL</label>
              <input 
                type="text" 
                value={newItemUrl}
                onChange={(e) => setNewItemUrl(e.target.value)}
                placeholder="https://example.com/image.jpg"
                style={{ width: '100%', marginTop: '0.25rem', padding: '0.5rem 0.75rem', fontSize: '0.875rem', border: '1px solid #F5E6D3', borderRadius: '0.75rem', backgroundColor: '#FFF8F0' }}
              />
            </div>
            <div>
              <label style={{ fontSize: '0.75rem', fontWeight: 500, color: '#4A2C2A' }}>Caption</label>
              <div style={{ display: 'flex', gap: '0.5rem', marginTop: '0.25rem' }}>
                <input 
                  type="text" 
                  value={newItemCaption}
                  onChange={(e) => setNewItemCaption(e.target.value)}
                  placeholder="Add caption..."
                  style={{ flex: 1, padding: '0.5rem 0.75rem', fontSize: '0.875rem', border: '1px solid #F5E6D3', borderRadius: '0.75rem', backgroundColor: '#FFF8F0' }}
                />
                <button onClick={handleAddItem} className="btn-gold" style={{ padding: '0.5rem 1rem', borderRadius: '0.75rem' }}>
                  Add
                </button>
              </div>
            </div>
          </div>
          <div style={{ marginTop: '0.75rem', fontSize: '0.75rem', color: 'rgba(74, 44, 42, 0.5)' }}>
            💡 Tip: Use Unsplash or any image URL for quick uploads
          </div>
        </div>
      )}

      <div className="gallery-grid">
        {galleryItems.map((item, index) => (
          <div key={item.id} className="gallery-item" style={{ backgroundColor: 'white', borderRadius: '0.75rem', overflow: 'hidden', boxShadow: '0 10px 25px -8px rgba(74, 44, 42, 0.12)', position: 'relative' }}>
            <div style={{ aspectRatio: '1/1', overflow: 'hidden' }}>
              <img 
                src={item.src} 
                alt={item.caption}
                style={{ width: '100%', height: '100%', objectFit: 'cover', transition: 'transform 0.5s ease' }}
                loading="lazy"
              />
              {item.type === 'video' && (
                <div style={{ position: 'absolute', top: '0.25rem', right: '0.25rem', backgroundColor: 'rgba(0,0,0,0.6)', color: 'white', fontSize: '0.625rem', padding: '0.125rem 0.375rem', borderRadius: '9999px', display: 'flex', alignItems: 'center', gap: '0.125rem', backdropFilter: 'blur(4px)' }}>
                  🎬 Video
                </div>
              )}
            </div>
            <div style={{ padding: '0.5rem' }}>
              <input 
                type="text" 
                value={item.caption}
                onChange={(e) => updateGalleryCaption(item.id, e.target.value)}
                placeholder="Add caption..."
                style={{ width: '100%', fontSize: '0.75rem', textAlign: 'center', background: 'transparent', border: 'none', borderBottom: '2px solid transparent', padding: '0.25rem' }}
                onFocus={(e) => e.target.style.borderBottomColor = '#C68E4D'}
                onBlur={(e) => e.target.style.borderBottomColor = 'transparent'}
              />
            </div>
            <div className="gallery-controls">
              <button onClick={() => moveUp(index)} className="gallery-control-btn">↑</button>
              <button onClick={() => moveDown(index)} className="gallery-control-btn">↓</button>
              <button onClick={() => removeGalleryItem(item.id)} className="gallery-control-btn danger">✕</button>
            </div>
          </div>
        ))}
      </div>
      
      {galleryItems.length === 0 && (
        <div style={{ textAlign: 'center', padding: '3rem 0', color: 'rgba(74, 44, 42, 0.5)' }}>
          <span style={{ fontSize: '3rem', display: 'block', marginBottom: '0.75rem' }}>📷</span>
          <p>No media in gallery yet. Click "Add Media" to get started!</p>
        </div>
      )}

      <div style={{ marginTop: '1.5rem', background: 'linear-gradient(to right, #F5E6D3, #FFF8F0)', padding: '1rem', borderRadius: '1.5rem', fontSize: '0.75rem', color: 'rgba(74, 44, 42, 0.7)', border: '1px solid rgba(198, 142, 77, 0.2)' }}>
        <p>💡 <strong>Management Tools:</strong> Hover over any item to reveal controls. You can reorder, edit captions, or delete media. All changes are saved in real-time.</p>
        <p style={{ marginTop: '0.25rem' }}>📸 <strong>Quick Add:</strong> Use any image URL from the web to instantly add to your gallery.</p>
      </div>
    </div>
  );
};

// ============================================
// SERVICES PAGE
// ============================================
const ServicesPage = () => {
  return (
    <div className="container" style={{ padding: '2rem 1rem' }}>
      <div style={{ textAlign: 'center', marginBottom: '2rem' }}>
        <h1 className="font-playfair" style={{ fontSize: '2.25rem', fontWeight: 700, color: '#4A2C2A' }}>Our Services</h1>
        <p style={{ color: 'rgba(74, 44, 42, 0.7)', marginTop: '0.5rem' }}>From intimate celebrations to grand events</p>
      </div>
      
      <div style={{ display: 'grid', gridTemplateColumns: '1fr', gap: '1rem' }}>
        {SERVICES.map((s, i) => (
          <div key={i} style={{ backgroundColor: 'white', borderRadius: '1.5rem', overflow: 'hidden', boxShadow: '0 10px 25px -8px rgba(74, 44, 42, 0.12)' }}>
            <div style={{ height: '10rem', overflow: 'hidden' }}>
              <img src={s.image} alt={s.title} style={{ width: '100%', height: '100%', objectFit: 'cover', transition: 'transform 0.5s ease' }} loading="lazy" />
            </div>
            <div style={{ padding: '1rem' }}>
              <div style={{ fontSize: '2.25rem', marginBottom: '0.25rem' }}>{s.icon}</div>
              <h3 className="font-playfair" style={{ fontSize: '1.125rem', fontWeight: 600, color: '#4A2C2A' }}>{s.title}</h3>
              <p style={{ fontSize: '0.75rem', color: 'rgba(74, 44, 42, 0.7)', marginTop: '0.25rem', lineHeight: 1.625 }}>{s.desc}</p>
              <button className="btn-outline-gold" style={{ marginTop: '0.75rem', padding: '0.375rem 1.5rem', borderRadius: '9999px', fontSize: '0.75rem', display: 'flex', alignItems: 'center', gap: '0.25rem' }}>
                Inquire Now ➡️
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

// ============================================
// CONTACT PAGE
// ============================================
const ContactPage = () => {
  const [formData, setFormData] = useState({ name: '', email: '', message: '' });

  const handleSubmit = (e) => {
    e.preventDefault();
    toast.success('✨ Message sent! We\'ll get back to you soon.', {
      position: "bottom-right",
      autoClose: 3000,
      style: { background: '#4A2C2A', color: '#FFF8F0' }
    });
    setFormData({ name: '', email: '', message: '' });
  };

  return (
    <div className="container" style={{ padding: '2rem 1rem' }}>
      <div style={{ textAlign: 'center', marginBottom: '2rem' }}>
        <h1 className="font-playfair" style={{ fontSize: '2.25rem', fontWeight: 700, color: '#4A2C2A' }}>Get in Touch</h1>
        <p style={{ color: 'rgba(74, 44, 42, 0.7)', marginTop: '0.5rem' }}>We'd love to hear from you!</p>
      </div>
      
      <div style={{ display: 'grid', gap: '1.5rem' }}>
        <div style={{ backgroundColor: 'white', padding: '1.5rem', borderRadius: '1.5rem', boxShadow: '0 10px 25px -8px rgba(74, 44, 42, 0.12)' }}>
          <h3 className="font-playfair" style={{ fontSize: '1.25rem', fontWeight: 600, color: '#4A2C2A' }}>Send a Message</h3>
          <form onSubmit={handleSubmit} style={{ marginTop: '1rem', display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
            <div>
              <label style={{ fontSize: '0.75rem', fontWeight: 500, color: 'rgba(74, 44, 42, 0.7)' }}>Your Name</label>
              <input 
                type="text" 
                placeholder="John Doe"
                value={formData.name}
                onChange={(e) => setFormData({...formData, name: e.target.value})}
                style={{ width: '100%', marginTop: '0.25rem', padding: '0.625rem 0.75rem', borderRadius: '0.75rem', border: '1px solid #F5E6D3', backgroundColor: 'rgba(255, 248, 240, 0.5)', fontSize: '0.875rem' }}
                required
              />
            </div>
            <div>
              <label style={{ fontSize: '0.75rem', fontWeight: 500, color: 'rgba(74, 44, 42, 0.7)' }}>Your Email</label>
              <input 
                type="email" 
                placeholder="john@example.com"
                value={formData.email}
                onChange={(e) => setFormData({...formData, email: e.target.value})}
                style={{ width: '100%', marginTop: '0.25rem', padding: '0.625rem 0.75rem', borderRadius: '0.75rem', border: '1px solid #F5E6D3', backgroundColor: 'rgba(255, 248, 240, 0.5)', fontSize: '0.875rem' }}
                required
              />
            </div>
            <div>
              <label style={{ fontSize: '0.75rem', fontWeight: 500, color: 'rgba(74, 44, 42, 0.7)' }}>Your Message</label>
              <textarea 
                rows="4"
                placeholder="Tell us about your sweet dreams..."
                value={formData.message}
                onChange={(e) => setFormData({...formData, message: e.target.value})}
                style={{ width: '100%', marginTop: '0.25rem', padding: '0.625rem 0.75rem', borderRadius: '0.75rem', border: '1px solid #F5E6D3', backgroundColor: 'rgba(255, 248, 240, 0.5)', fontSize: '0.875rem', resize: 'vertical' }}
                required
              />
            </div>
            <button type="submit" className="btn-gold" style={{ width: '100%', padding: '0.75rem', borderRadius: '0.75rem', fontWeight: 600, display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '0.5rem' }}>
              Send Message ➡️
            </button>
          </form>
        </div>
        
        <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
          <div style={{ backgroundColor: 'white', padding: '1.5rem', borderRadius: '1.5rem', boxShadow: '0 10px 25px -8px rgba(74, 44, 42, 0.12)' }}>
            <h3 className="font-playfair" style={{ fontSize: '1.25rem', fontWeight: 600, color: '#4A2C2A' }}>Contact Information</h3>
            <div style={{ marginTop: '1rem', display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', padding: '0.5rem', borderRadius: '0.75rem' }}>
                <span style={{ fontSize: '1.25rem' }}>📞</span>
                <span style={{ fontSize: '0.875rem' }}>+1 234 567 8900</span>
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', padding: '0.5rem', borderRadius: '0.75rem' }}>
                <span style={{ fontSize: '1.25rem' }}>✉️</span>
                <span style={{ fontSize: '0.875rem', wordBreak: 'break-all' }}>hello@loveatfirstbite.com</span>
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', padding: '0.5rem', borderRadius: '0.75rem' }}>
                <span style={{ fontSize: '1.25rem' }}>📍</span>
                <span style={{ fontSize: '0.875rem' }}>123 Baker Lane, Sweet City</span>
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', padding: '0.5rem', borderRadius: '0.75rem' }}>
                <span style={{ fontSize: '1.25rem' }}>🕐</span>
                <span style={{ fontSize: '0.875rem' }}>Mon-Sat: 8am-8pm · Sun: 9am-6pm</span>
              </div>
            </div>
            <div style={{ display: 'flex', gap: '0.75rem', marginTop: '1rem', paddingTop: '1rem', borderTop: '1px solid #F5E6D3', fontSize: '1.5rem' }}>
              <span style={{ cursor: 'pointer' }}>📸</span>
              <span style={{ cursor: 'pointer' }}>📘</span>
              <span style={{ cursor: 'pointer' }}>🐦</span>
              <span style={{ cursor: 'pointer' }}>▶️</span>
            </div>
          </div>
          
          <a 
            href="https://wa.me/12345678900" 
            target="_blank" 
            rel="noopener noreferrer"
            style={{ display: 'block', backgroundColor: '#22c55e', color: 'white', padding: '0.75rem', borderRadius: '1.5rem', textAlign: 'center', fontWeight: 600, textDecoration: 'none', boxShadow: '0 10px 15px -3px rgba(0,0,0,0.1)', transition: 'all 0.3s ease' }}
            onMouseEnter={(e) => e.target.style.backgroundColor = '#16a34a'}
            onMouseLeave={(e) => e.target.style.backgroundColor = '#22c55e'}
          >
            💬 Chat with us on WhatsApp
          </a>
          
          <div style={{ background: 'linear-gradient(to right, #F5E6D3, #FFF8F0)', padding: '1rem', borderRadius: '1.5rem', border: '1px solid rgba(198, 142, 77, 0.2)' }}>
            <h4 className="font-playfair" style={{ fontSize: '1rem', fontWeight: 600, color: '#4A2C2A' }}>Find Us</h4>
            <div style={{ marginTop: '0.5rem', borderRadius: '0.75rem', overflow: 'hidden', height: '8rem', backgroundColor: 'rgba(74, 44, 42, 0.1)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              <div style={{ textAlign: 'center' }}>
                <span style={{ fontSize: '2.25rem', display: 'block' }}>📍</span>
                <p style={{ fontSize: '0.75rem', color: 'rgba(74, 44, 42, 0.7)', marginTop: '0.25rem' }}>123 Baker Lane, Sweet City</p>
                <p style={{ fontSize: '0.625rem', color: 'rgba(74, 44, 42, 0.5)' }}>Interactive map coming soon</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

// ============================================
// EXPORT
// ============================================
export default LoveAtFirstBite;