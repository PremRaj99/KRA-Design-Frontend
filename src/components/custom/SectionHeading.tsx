import { ArrowRight } from 'lucide-react';
import { Button } from '../ui/button';
import { useNavigate } from 'react-router-dom';
import type { ReactNode } from 'react';

export default function SectionHeading({
  title,
  subtitle,
  ctaText,
  ctaHref,
}: {
  title: ReactNode | string;
  subtitle: ReactNode | string;
  ctaText?: string;
  ctaHref?: string;
}) {
  const navigate = useNavigate();

  const handleCTAClick = () => {
    if (ctaHref) {
      navigate(ctaHref);
    }
  };
  return (
    <div className="mb-10 flex flex-col items-center justify-between gap-6 md:mb-16 md:flex-row md:items-end">
      <div className="max-w-2xl text-center md:text-left">
        <h2 className="font-geist text-foreground text-3xl font-bold tracking-tight sm:text-4xl">
          {title}
        </h2>
        <p className="text-muted-foreground mt-4 font-sans text-lg">{subtitle}</p>
      </div>
      {ctaText && (
        <Button
          variant="ghost"
          className="text-primary hover:bg-muted hidden font-sans md:flex"
          onClick={handleCTAClick}
        >
          {ctaText}
          <ArrowRight className="ml-2 h-4 w-4" />
        </Button>
      )}
    </div>
  );
}
