import { useRef, useEffect, useState } from 'react';
import gsap from 'gsap';
import ProductItem from './ProductItem';

const products = [
  { id: 1, name: 'Amber Roast', image: 'https://i.postimg.cc/26ySvDHS/b1.jpg', align: 'left', bg: 'https://i.postimg.cc/y89HMNGx/inicio.jpg', rot: -12, yOff: 40 },
  { id: 2, name: 'Velvet Latte', image: 'https://i.postimg.cc/d13VdYW0/b2.jpg', align: 'left', bg: 'https://i.postimg.cc/y89HMNGx/inicio.jpg', rot: -6, yOff: -20 },
  { id: 3, name: 'Signature Blend', image: 'https://i.postimg.cc/XJqYFb2N/b3.jpg', align: 'center', bg: 'https://i.postimg.cc/y89HMNGx/inicio.jpg', rot: -2, yOff: -60 },
  { id: 4, name: 'Espresso Elegance', image: 'https://i.postimg.cc/tTJ4PjrC/b4.jpg', align: 'center', bg: 'https://i.postimg.cc/y89HMNGx/inicio.jpg', rot: 4, yOff: -80 },
  { id: 5, name: 'Midnight Brew', image: 'https://i.postimg.cc/C12LsQtY/b5.jpg', align: 'right', bg: 'https://i.postimg.cc/y89HMNGx/inicio.jpg', rot: 10, yOff: -30 },
  { id: 6, name: 'Golden Drip', image: 'https://i.postimg.cc/V6hLWVTm/b6.jpg', align: 'right', bg: 'https://i.postimg.cc/y89HMNGx/inicio.jpg', rot: 18, yOff: 20 },
];

export default function HeroSection() {
  const containerRef = useRef(null);
  const [hoveredId, setHoveredId] = useState(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      products.forEach((product, i) => {
        gsap.fromTo(
          `.product-card-${product.id}`,
          { 
            y: 400, 
            opacity: 0, 
            rotationX: 60,
            rotationZ: 0,
            scale: 0.7,
            translateZ: -400
          },
          {
            y: product.yOff,
            opacity: 1,
            rotationX: 0,
            rotationZ: product.rot,
            scale: 1,
            translateZ: 0,
            duration: 2.5,
            ease: 'power4.out',
            delay: 0.3 + (i * 0.15),
          }
        );
      });
    }, containerRef);

    return () => ctx.revert();
  }, []);

  return (
    <section ref={containerRef} className="relative min-h-screen flex items-center justify-center overflow-visible">
      <div className="flex flex-row items-center justify-center -space-x-8 md:-space-x-12 lg:-space-x-16 px-4 w-full max-w-[1400px] h-full product-container overflow-visible">
        {products.map((product) => (
          <div 
            key={product.id} 
            className={`product-card-${product.id} transform-gpu`}
            style={{ 
              zIndex: hoveredId === product.id ? 100 : 10 + product.id,
              position: 'relative'
            }}
            onMouseEnter={() => setHoveredId(product.id)}
            onMouseLeave={() => setHoveredId(null)}
          >
            <ProductItem 
              product={product} 
            />
          </div>
        ))}
      </div>

      <div className="absolute bottom-0 left-0 w-full h-[30vh] bg-gradient-to-t from-bg-dark to-transparent pointer-events-none" />
    </section>
  );
}
