import { useRef, useEffect } from 'react';
import gsap from 'gsap';

export default function ProductItem({ product, onClick, className }) {
  const cardRef = useRef(null);
  const imageRef = useRef(null);
  const labelRef = useRef(null);
  const floatAnimRef = useRef(null);

  useEffect(() => {
    // Start idle levitation animation after the main entrance delay
    floatAnimRef.current = gsap.to(cardRef.current, {
      y: "-=15",
      duration: 2,
      ease: "sine.inOut",
      yoyo: true,
      repeat: -1,
      delay: Math.random() * 1.5 + 2, // Random delay so they don't float perfectly in sync
    });

    return () => {
      if (floatAnimRef.current) floatAnimRef.current.kill();
    };
  }, []);

  const handleMouseEnter = () => {
    if (floatAnimRef.current) floatAnimRef.current.pause();
    
    gsap.to(cardRef.current, {
      y: -50,
      scale: 1.25,
      zIndex: 100, // Traer al frente
      duration: 0.6,
      ease: 'power3.out',
    });
    gsap.to(imageRef.current, {
      filter: 'drop-shadow(0px 8px 6px rgba(0, 0, 0, 0.8)) drop-shadow(0px 30px 25px rgba(0, 0, 0, 0.6)) brightness(1.2)',
      duration: 0.6,
    });
    gsap.to(labelRef.current, {
      opacity: 1,
      y: 0,
      duration: 0.4,
      ease: 'back.out(1.5)',
    });
  };

  const handleMouseLeave = () => {
    gsap.to(cardRef.current, {
      y: 0,
      scale: 1,
      zIndex: 1, // Volver a su lugar
      duration: 0.8,
      ease: 'power3.out',
      onComplete: () => {
        if (floatAnimRef.current) floatAnimRef.current.restart();
      }
    });
    gsap.to(imageRef.current, {
      filter: 'drop-shadow(0px 8px 6px rgba(0, 0, 0, 0.8)) drop-shadow(0px 20px 15px rgba(0, 0, 0, 0.5)) brightness(1)',
      duration: 0.8,
    });
    gsap.to(labelRef.current, {
      opacity: 0,
      y: 10,
      duration: 0.3,
    });
  };

  return (
    <div 
      ref={cardRef}
      className={`product-card group relative flex flex-col items-center justify-end cursor-pointer w-[15vw] max-w-[200px] min-w-[100px] z-10 ${className}`}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      onClick={(e) => e.preventDefault()}
    >
      {/* Cursive Arrow Only */}
      <div 
        ref={labelRef} 
        className="absolute -top-20 opacity-0 translate-y-2 flex flex-col items-center pointer-events-none"
      >
        <svg width="40" height="40" viewBox="0 0 100 100" className="opacity-80 rotate-[15deg] mt-1 text-brand-blue" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round">
          <path d="M50 10 Q60 50 20 80" />
          <path d="M20 80 L35 70 M20 80 L30 90" />
        </svg>
      </div>

      <div className="relative w-full aspect-[1/2] flex justify-center items-end">
        {/* Ambient shadow beneath the image base */}
        <div className="absolute bottom-0 w-[120%] h-[20px] rounded-[100%] shadow-ambient opacity-80" />
        
        {/* Main Product Image */}
        <img 
          ref={imageRef}
          src={product.image} 
          alt="" 
          onContextMenu={(e) => e.preventDefault()}
          onDragStart={(e) => e.preventDefault()}
          className="relative z-10 w-full h-auto object-contain shadow-ao shadow-volume transition-all duration-300 transform-gpu rounded-lg pointer-events-auto select-none"
          style={{ 
            filter: 'drop-shadow(0px 8px 6px rgba(0, 0, 0, 0.8)) drop-shadow(0px 20px 15px rgba(0, 0, 0, 0.5)) brightness(1)',
            WebkitUserDrag: 'none'
          }}
        />
      </div>
    </div>
  );
}
