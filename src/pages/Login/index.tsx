import React, { useState } from 'react';
import { Helmet } from 'react-helmet-async';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowLeft, Loader2, ShieldCheck, Smartphone } from 'lucide-react';

import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';

// --- Types ---
type AuthStep = 'google' | 'phone' | 'otp' | 'success';

// --- Animation Variants ---
const stepVariants = {
  initial: (direction: number) =>
    ({
      opacity: 0,
      x: direction > 0 ? 40 : -40,
    }) as const,
  animate: {
    opacity: 1,
    x: 0,
    transition: { type: 'spring', stiffness: 300, damping: 28 },
  } as const,
  exit: (direction: number) =>
    ({
      opacity: 0,
      x: direction < 0 ? 40 : -40,
      transition: { ease: 'easeInOut', duration: 0.2 },
    }) as const,
};

export default function LoginPage() {
  const [step, setStep] = useState<AuthStep>('google');
  const [direction, setDirection] = useState(1); // 1 for forward, -1 for backward
  const [isLoading, setIsLoading] = useState(false);

  // Form States
  const [phoneNumber, setPhoneNumber] = useState('');
  const [otp, setOtp] = useState('');

  // --- Handlers ---
  const navigateTo = (nextStep: AuthStep, dir: number) => {
    setDirection(dir);
    setStep(nextStep);
  };

  const handleGoogleLogin = async () => {
    setIsLoading(true);
    // Simulate OAuth network request
    await new Promise((resolve) => setTimeout(resolve, 1500));
    setIsLoading(false);

    // MOCK LOGIC: Force the multi-step flow for demonstration purposes.
    // In production, check your backend response to see if `user.isNew`
    const isNewUser = true;

    if (isNewUser) {
      navigateTo('phone', 1);
    } else {
      window.location.href = '/'; // Redirect existing user immediately
    }
  };

  const handlePhoneSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (phoneNumber.length < 10) return;

    setIsLoading(true);
    // Simulate sending SMS
    await new Promise((resolve) => setTimeout(resolve, 1000));
    setIsLoading(false);
    navigateTo('otp', 1);
  };

  const handleOtpSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (otp.length < 4) return;

    setIsLoading(true);
    // Simulate OTP verification
    await new Promise((resolve) => setTimeout(resolve, 1500));
    setIsLoading(false);

    // Redirect to home upon success
    window.location.href = '/';
  };

  return (
    <div className="bg-background flex min-h-body w-full">
      <Helmet>
        <title>Sign In | KRA Design</title>
        <meta
          name="description"
          content="Sign in to KRA Design to access your curated home essentials."
        />
      </Helmet>

      {/* Left Column: Premium Illustration / Image */}
      <div className="relative hidden w-1/2 overflow-hidden lg:block">
        <motion.img
          initial={{ scale: 1.05 }}
          animate={{ scale: 1 }}
          transition={{ duration: 1.5, ease: 'easeOut' }}
          src="https://images.unsplash.com/photo-1616486338812-3dadae4b4ace?q=80&w=2560&auto=format&fit=crop"
          alt="Luxury Living Room"
          className="absolute inset-0 h-full w-full object-cover"
        />
        {/* Subtle dark gradient overlay */}
        <div className="absolute inset-0 bg-linear-to-t from-black/60 via-black/10 to-transparent" />

        <div className="absolute right-12 bottom-12 left-12 text-white">
          <h2 className="font-geist mb-3 text-4xl font-bold tracking-tight drop-shadow-md">
            Curate Your Sanctuary.
          </h2>
          <p className="max-w-md font-sans text-lg text-white/80 drop-shadow-sm">
            Access exclusive collections, manage your orders, and consult with our design
            concierges.
          </p>
        </div>
      </div>

      {/* Right Column: Authentication Flow */}
      <div className="relative flex w-full flex-col items-center justify-center p-8 sm:p-12 lg:w-1/2 xl:p-24">
        {/* Absolute positioned Back Button for multi-step */}
        <AnimatePresence>
          {step !== 'google' && (
            <motion.button
              initial={{ opacity: 0, x: -10 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -10 }}
              onClick={() => navigateTo(step === 'otp' ? 'phone' : 'google', -1)}
              className="border-border text-muted-foreground hover:bg-muted absolute top-8 left-8 flex h-10 w-10 items-center justify-center rounded-full border transition-colors sm:top-12 sm:left-12"
            >
              <ArrowLeft className="h-5 w-5" />
            </motion.button>
          )}
        </AnimatePresence>

        <div className="relative w-full max-w-sm">
          <div className="mb-8 text-center sm:text-left">
            <a
              href="/"
              className="font-geist text-foreground mb-12 inline-block text-2xl font-bold tracking-tight"
            >
              KRA Design
            </a>
          </div>

          <div className="relative min-h-75 overflow-hidden">
            <AnimatePresence mode="popLayout" custom={direction} initial={false}>
              {/* STEP 1: GOOGLE LOGIN */}
              {step === 'google' && (
                <motion.div
                  key="step-google"
                  custom={direction}
                  variants={stepVariants}
                  initial="initial"
                  animate="animate"
                  exit="exit"
                  className="flex w-full flex-col"
                >
                  <h1 className="font-geist text-foreground mb-2 text-3xl font-bold tracking-tight">
                    Welcome Back
                  </h1>
                  <p className="text-muted-foreground mb-8 font-sans">
                    Sign in to continue to your account.
                  </p>

                  <Button
                    onClick={handleGoogleLogin}
                    disabled={isLoading}
                    variant="outline"
                    size="lg"
                    className="group border-border hover:bg-muted relative h-12 w-full overflow-hidden font-sans text-base font-medium transition-colors"
                  >
                    {isLoading ? (
                      <Loader2 className="text-muted-foreground h-5 w-5 animate-spin" />
                    ) : (
                      <>
                        <GoogleIcon className="mr-3 h-5 w-5" />
                        Continue with Google
                      </>
                    )}
                  </Button>

                  <p className="text-muted-foreground mt-8 text-center font-sans text-xs leading-relaxed">
                    By continuing, you agree to KRA Design's{' '}
                    <a href="/terms" className="hover:text-foreground underline">
                      Terms of Service
                    </a>{' '}
                    and{' '}
                    <a href="/privacy" className="hover:text-foreground underline">
                      Privacy Policy
                    </a>
                    .
                  </p>
                </motion.div>
              )}

              {/* STEP 2: PHONE NUMBER */}
              {step === 'phone' && (
                <motion.div
                  key="step-phone"
                  custom={direction}
                  variants={stepVariants}
                  initial="initial"
                  animate="animate"
                  exit="exit"
                  className="flex w-full flex-col p-2"
                >
                  <div className="bg-muted border-border mb-6 flex h-12 w-12 items-center justify-center rounded-full border">
                    <Smartphone className="text-foreground h-6 w-6" />
                  </div>
                  <h1 className="font-geist text-foreground mb-2 text-3xl font-bold tracking-tight">
                    Secure Your Account
                  </h1>
                  <p className="text-muted-foreground mb-8 font-sans">
                    As this is your first time signing in, please verify your mobile number for
                    account security and delivery updates.
                  </p>

                  <form onSubmit={handlePhoneSubmit} className="space-y-6">
                    <div className="space-y-2">
                      <Label htmlFor="phone" className="text-muted-foreground font-sans">
                        Mobile Number
                      </Label>
                      <Input
                        id="phone"
                        type="tel"
                        required
                        placeholder="+1 (555) 000-0000"
                        value={phoneNumber}
                        onChange={(e) => setPhoneNumber(e.target.value)}
                        className="bg-background border-border focus-visible:ring-primary h-11 rounded-lg px-4 font-sans text-sm"
                        autoFocus
                      />
                    </div>

                    <Button
                      type="submit"
                      disabled={isLoading || phoneNumber.length < 10}
                      className="h-12 w-full font-sans text-base font-medium"
                    >
                      {isLoading ? (
                        <Loader2 className="h-5 w-5 animate-spin" />
                      ) : (
                        'Send Verification Code'
                      )}
                    </Button>
                  </form>
                </motion.div>
              )}

              {/* STEP 3: OTP VERIFICATION */}
              {step === 'otp' && (
                <motion.div
                  key="step-otp"
                  custom={direction}
                  variants={stepVariants}
                  initial="initial"
                  animate="animate"
                  exit="exit"
                  className="flex w-full flex-col p-2"
                >
                  <div className="bg-muted border-border mb-6 flex h-12 w-12 items-center justify-center rounded-full border">
                    <ShieldCheck className="text-foreground h-6 w-6" />
                  </div>
                  <h1 className="font-geist text-foreground mb-2 text-3xl font-bold tracking-tight">
                    Verify Your Number
                  </h1>
                  <p className="text-muted-foreground mb-8 font-sans">
                    We've sent a 6-digit code to{' '}
                    <span className="text-foreground font-semibold">{phoneNumber}</span>.
                  </p>

                  <form onSubmit={handleOtpSubmit} className="space-y-6">
                    <div className="space-y-2">
                      <Label htmlFor="otp" className="text-muted-foreground font-sans">
                        Verification Code
                      </Label>
                      <Input
                        id="otp"
                        type="text"
                        inputMode="numeric"
                        maxLength={6}
                        required
                        placeholder="• • • • • •"
                        value={otp}
                        onChange={(e) => setOtp(e.target.value.replace(/\D/g, ''))}
                        className="bg-background border-border focus-visible:ring-primary h-12 text-center font-sans text-2xl tracking-[0.5em]"
                        autoFocus
                      />
                    </div>

                    <Button
                      type="submit"
                      disabled={isLoading || otp.length < 6}
                      className="h-12 w-full font-sans text-base font-medium"
                    >
                      {isLoading ? (
                        <Loader2 className="h-5 w-5 animate-spin" />
                      ) : (
                        'Verify & Continue'
                      )}
                    </Button>
                  </form>

                  <div className="mt-6 text-center">
                    <button
                      type="button"
                      className="text-muted-foreground hover:text-foreground decoration-border hover:decoration-foreground font-sans text-sm underline transition-colors"
                    >
                      Didn't receive a code? Resend
                    </button>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>
      </div>
    </div>
  );
}

// --- Custom Google SVG Icon for authentic look ---
const GoogleIcon = ({ className }: { className?: string }) => (
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" className={className}>
    <path
      d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
      fill="#4285F4"
    />
    <path
      d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
      fill="#34A853"
    />
    <path
      d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
      fill="#FBBC05"
    />
    <path
      d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
      fill="#EA4335"
    />
  </svg>
);
