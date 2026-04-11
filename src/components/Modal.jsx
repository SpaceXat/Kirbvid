import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { X } from 'lucide-react';

export default function Modal({ product, onClose }) {
  const modalRef = useRef(null);
  const contentRef = useRef(null);
  const bgRef = useRef(null);

  useEffect(() => {
    // 3D Flip entrance animation
    const tl = gsap.timeline();
    
    tl.fromTo(modalRef.current, 
      { opacity: 0 }, 
      { opacity: 1, duration: 0.3 }
    )
    .fromTo(bgRef.current,
      { scale: 1.1, opacity: 0 },
      { scale: 1, opacity: 1, duration: 1, ease: 'power2.out' },
      "-=0.1"
    )
    .fromTo(contentRef.current,
      { 
        y: 400, 
        rotationX: -60, 
        opacity: 0,
        z: -800,
        scale: 0.8
      },
      { 
        y: 0, 
        rotationX: 0, 
        opacity: 1,
        z: 0,
        scale: 1,
        duration: 1.5, 
        ease: 'power4.out',
        transformPerspective: 800
      },
      "-=0.8"
    );

    return () => tl.kill();
  }, []);

  const handleClose = () => {
    gsap.to(modalRef.current, {
      opacity: 0,
      duration: 0.4,
      onComplete: onClose
    });
  };

  const getAlignmentClasses = () => {
    switch(product.align) {
      case 'left': return 'items-start text-left justify-center';
      case 'right': return 'items-end text-right justify-center';
      case 'center': default: return 'items-center text-center justify-end pb-[10vh]';
    }
  };

  const getGradientClasses = () => {
    switch(product.align) {
      case 'left': return 'bg-gradient-to-r from-bg-dark/90 via-bg-dark/50 to-transparent';
      case 'right': return 'bg-gradient-to-l from-bg-dark/90 via-bg-dark/50 to-transparent';
      case 'center': default: return 'bg-gradient-to-t from-bg-dark/90 via-bg-dark/50 to-transparent';
    }
  };

  return (
    <div ref={modalRef} className="fixed inset-0 z-50 flex overflow-hidden">
      <div 
        ref={bgRef}
        className="absolute inset-0 bg-cover bg-center"
        style={{ backgroundImage: `url(${product.bg})` }}
      />
      
      {/* Dynamic gradient for text contrast */}
      <div className={`absolute inset-0 ${getGradientClasses()}`} />

      <button 
        onClick={handleClose}
        className="absolute top-8 right-8 z-50 p-3 rounded-full bg-bg-dark/50 hover:bg-bg-dark text-brand-light backdrop-blur-md transition-colors border border-brand-light/10"
      >
        <X size={24} />
      </button>

      <div 
        ref={contentRef}
        className={`relative z-10 w-full h-full flex flex-col p-[5vw] ${getAlignmentClasses()}`}
      >
        <div className="max-w-[40vw] min-w-[300px]">
          <h2 className="font-cursive text-[clamp(2rem,5vmax,6rem)] text-brand-blue drop-shadow-lg leading-none mb-4">
            {product.name}
          </h2>
          <p className="font-sans text-[clamp(1rem,1.5vmax,2rem)] text-brand-light/90 font-light leading-relaxed drop-shadow-md">
            Experience the rich, cinematic taste of our meticulously curated blends. 
            Roasted to perfection for those who appreciate the poetry in every pour.
          </p>
          <div className="mt-8">
            <button className="px-8 py-4 bg-brand-light text-bg-dark font-sans font-bold uppercase tracking-widest rounded-full hover:scale-105 transition-transform shadow-[0_0_20px_rgba(253,252,238,0.3)]">
              Discover More
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
