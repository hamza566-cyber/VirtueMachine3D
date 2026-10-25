
import { motion, useReducedMotion } from "framer-motion";
import {
  FileText,
  Calculator,
  Layers,
  Settings2,
  Ruler,
  Globe,
  Settings,
  ArrowRight,
  Box,
  Printer,
  Palette,
  Lightbulb,
  Wrench,
  ScanLine,
  PackageCheck,
  ClipboardCheck,
  Truck,
  Factory,
  Cog,
  Search,
  ClipboardList,
  Handshake,
  ShoppingCart,
  CheckCircle2,
} from "lucide-react";
import { fadeUp, stagger, viewOnce } from "./Motionpresets.js";

const defaultSteps = [
  { number: "01", title: "SUBMIT SPECIFICATIONS", icon: FileText },
  { number: "02", title: "GET QUICK QUOTES", icon: Calculator },
  { number: "03", title: "SPECIFY MATERIALS", icon: Layers },
  { number: "04", title: "CNC PRODUCTION", icon: Settings2 },
  { number: "05", title: "QUALITY INSPECTION", icon: Ruler },
  { number: "06", title: "GLOBAL SHIPPING", icon: Globe },
];

const serviceStepIcons = {
  "rapid-prototyping": [
    FileText,
    ScanLine,
    Layers,
    Box,
    ClipboardCheck,
    PackageCheck,
  ],
  "industrial-3d-printing": [
    FileText,
    ClipboardCheck,
    Printer,
    Factory,
    Ruler,
    Truck,
  ],
  "custom-3d-printing": [
    Lightbulb,
    ScanLine,
    Palette,
    Printer,
    ClipboardCheck,
    PackageCheck,
  ],
  "product-development": [
    Lightbulb,
    FileText,
    Settings,
    Box,
    ClipboardCheck,
    Factory,
  ],
  "functional-prototypes": [
    ClipboardCheck,
    ScanLine,
    Layers,
    Box,
    Settings2,
    PackageCheck,
  ],
  "engineering-parts": [
    FileText,
    Ruler,
    Layers,
    Cog,
    ClipboardCheck,
    PackageCheck,
  ],
  "replacement-parts": [
    Wrench,
    ScanLine,
    Box,
    Layers,
    Settings2,
    PackageCheck,
  ],
  "small-batch-manufacturing": [
    FileText,
    Calculator,
    Settings,
    Factory,
    ClipboardCheck,
    Truck,
  ],
  procurement: [
    FileText,
    ClipboardList,
    Search,
    Calculator,
    CheckCircle2,
    Truck,
  ],
  "cnc-procurement": [
    FileText,
    Calculator,
    Layers,
    Settings2,
    Ruler,
    Globe,
  ],
  "cnc-parts-procurement": [
    FileText,
    Calculator,
    Layers,
    Settings2,
    Ruler,
    Globe,
  ],
};

const containerVariants = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: {
      staggerChildren: 0.12,
      delayChildren: 0.15,
    },
  },
};

const stepItemVariants = {
  hidden: { opacity: 0, y: 18 },
  show: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.6,
      ease: [0.22, 1, 0.36, 1],
    },
  },
};

const sparklePositions = [
  { top: "15%", left: "20%" },
  { top: "24%", right: "18%" },
  { bottom: "20%", left: "18%" },
  { bottom: "16%", right: "22%" },
];

export default function ServiceProcess({ service }) {
  const shouldReduceMotion = useReducedMotion();

  const rawProcess = service?.process;

  const serviceSteps = Array.isArray(rawProcess)
    ? rawProcess
    : Array.isArray(rawProcess?.steps)
      ? rawProcess.steps
      : [];

  const steps =
    serviceSteps.length > 0
      ? serviceSteps.map((step, index) => ({
          number:
            typeof step === "object" && step.number
              ? String(step.number)
              : typeof step === "object" && step.step
                ? String(step.step)
                : String(index + 1).padStart(2, "0"),
          title: String(
            typeof step === "string"
              ? step
              : step.title || "PROCESS STEP"
          ).toUpperCase(),
          description:
            typeof step === "object" ? step.description || "" : "",
          icon:
            serviceStepIcons[service?.id]?.[index] ||
            defaultSteps[index % defaultSteps.length].icon,
        }))
      : defaultSteps;

  const sectionTitle = service?.title
    ? `How Our ${service.title} Process Works`
    : "How Our Procurement Process Works";

  return (
    <section
      id="process"
      className="relative isolate -mt-6 overflow-hidden border-t border-white/5 bg-[#080A08] py-16 text-[#F5F7F4] sm:-mt-8 sm:py-20"
    >
      <motion.div
        aria-hidden="true"
        className="pointer-events-none absolute -left-32 top-20 -z-10 h-64 w-64 rounded-full bg-[#16C868]/[0.06] blur-[90px]"
        animate={
          shouldReduceMotion
            ? undefined
            : {
                x: [0, 25, 0],
                y: [0, -15, 0],
              }
        }
        transition={{
          duration: 9,
          repeat: Infinity,
          ease: "easeInOut",
        }}
      />

      <motion.div
        aria-hidden="true"
        className="pointer-events-none absolute -right-32 bottom-0 -z-10 h-64 w-64 rounded-full bg-[#16C868]/[0.05] blur-[90px]"
        animate={
          shouldReduceMotion
            ? undefined
            : {
                x: [0, -20, 0],
                y: [0, 15, 0],
              }
        }
        transition={{
          duration: 11,
          repeat: Infinity,
          ease: "easeInOut",
        }}
      />

      <div className="mx-auto max-w-7xl px-5 sm:px-6">
        <motion.div
          variants={stagger}
          initial={shouldReduceMotion ? false : "hidden"}
          whileInView="show"
          viewport={viewOnce}
          className="mb-12 flex flex-col items-center justify-center text-center sm:mb-16"
        >
          <motion.div
            variants={fadeUp}
            className="mb-4 flex items-center gap-3"
          >
            <span className="h-px w-8 bg-gradient-to-r from-transparent to-[#16C868]" />

            <div className="relative flex h-10 w-10 items-center justify-center rounded-full border border-[#16C868]/35 bg-[#16C868]/10 text-[#16C868]">
              <Settings className="h-5 w-5" />
              <span className="absolute inset-[-4px] rounded-full border border-dashed border-[#16C868]/25" />
            </div>

            <span className="h-px w-8 bg-gradient-to-l from-transparent to-[#16C868]" />
          </motion.div>

          <motion.span
            variants={fadeUp}
            className="mb-2 text-[10px] font-semibold uppercase tracking-[0.24em] text-[#16C868] sm:text-xs"
          >
            From concept to completion
          </motion.span>

          <motion.h2
            variants={fadeUp}
            className="vm-display max-w-3xl text-xl font-bold tracking-tight text-white sm:text-2xl lg:text-3xl"
          >
            {sectionTitle}
          </motion.h2>

          <motion.p
            variants={fadeUp}
            className="mt-3 max-w-xl text-xs leading-6 text-white/55 sm:text-sm"
          >
            A clear, quality-focused workflow designed to move your project
            forward with confidence at every stage.
          </motion.p>

          <motion.div
            variants={fadeUp}
            className="mt-5 h-1 w-12 rounded-full bg-[#16C868]"
          />
        </motion.div>

        <div className="relative">
          <div className="pointer-events-none absolute left-[8%] right-[8%] top-7 hidden h-px bg-white/10 lg:block">
            <motion.div
              className="h-full w-full origin-left bg-gradient-to-r from-[#16C868]/20 via-[#16C868] to-[#16C868]/20"
              initial={shouldReduceMotion ? false : { scaleX: 0 }}
              whileInView={{ scaleX: 1 }}
              viewport={viewOnce}
              transition={{
                duration: 1.4,
                delay: 0.2,
                ease: "easeOut",
              }}
            />
          </div>

          <motion.div
            variants={containerVariants}
            initial={shouldReduceMotion ? false : "hidden"}
            whileInView="show"
            viewport={viewOnce}
            className="relative z-10 grid grid-cols-2 gap-x-4 gap-y-8 sm:grid-cols-3 sm:gap-x-5 sm:gap-y-9 lg:grid-cols-6 lg:gap-4"
          >
            {steps.map((step, index) => {
              const Icon = step.icon;

              return (
                <motion.div
                  key={`${step.number}-${step.title}`}
                  variants={stepItemVariants}
                  className="group relative flex min-w-0 flex-col items-center text-center"
                >
                  <div className="group/icon relative mb-4 flex h-[60px] w-[60px] items-center justify-center overflow-hidden rounded-xl border border-[#16C868]/25 bg-[#0D110E] shadow-[0_0_12px_rgba(22,200,104,0.06)] transition-colors duration-300 group-hover:border-[#16C868]/60 sm:h-[68px] sm:w-[68px]">
                    <motion.div
                      aria-hidden="true"
                      className="pointer-events-none absolute inset-0 rounded-xl bg-[radial-gradient(circle,rgba(22,200,104,0.2)_0%,transparent_72%)]"
                      animate={
                        shouldReduceMotion
                          ? undefined
                          : { opacity: [0.25, 0.7, 0.25] }
                      }
                      transition={{
                        duration: 2.8,
                        repeat: Infinity,
                        ease: "easeInOut",
                        delay: index * 0.15,
                      }}
                    />

                    {!shouldReduceMotion &&
                      sparklePositions.map((position, sparkleIndex) => (
                        <motion.span
                          key={sparkleIndex}
                          aria-hidden="true"
                          className="pointer-events-none absolute z-20 h-1 w-1 rounded-full bg-[#D7FFE7] shadow-[0_0_6px_2px_rgba(22,200,104,0.75)]"
                          style={position}
                          animate={{
                            opacity: [0, 1, 0],
                            scale: [0.5, 1.4, 0.5],
                          }}
                          transition={{
                            duration: 1.8 + sparkleIndex * 0.25,
                            repeat: Infinity,
                            ease: "easeInOut",
                            delay: sparkleIndex * 0.35 + index * 0.1,
                          }}
                        />
                      ))}

                    <div className="pointer-events-none absolute inset-0 bg-gradient-to-br from-white/[0.035] via-transparent to-[#16C868]/[0.06]" />

                    <div className="relative z-10 text-[#16C868] drop-shadow-[0_0_5px_rgba(22,200,104,0.8)]">
                      <Icon
                        strokeWidth={1.7}
                        className="h-6 w-6 sm:h-7 sm:w-7"
                      />
                    </div>

                    <motion.span
                      aria-hidden="true"
                      className="pointer-events-none absolute bottom-1.5 left-1/2 h-px w-5 -translate-x-1/2 bg-gradient-to-r from-transparent via-[#16C868] to-transparent"
                      animate={
                        shouldReduceMotion
                          ? undefined
                          : {
                              opacity: [0.2, 0.9, 0.2],
                              scaleX: [0.7, 1.2, 0.7],
                            }
                      }
                      transition={{
                        duration: 2,
                        repeat: Infinity,
                        ease: "easeInOut",
                        delay: index * 0.15,
                      }}
                    />
                  </div>

                  <span className="mb-1.5 font-mono text-[10px] font-semibold tracking-[0.18em] text-[#16C868]/80">
                    STEP {step.number}
                  </span>

                  <h3 className="max-w-[140px] text-[10px] font-bold leading-5 tracking-[0.07em] text-white transition-colors duration-300 group-hover:text-[#16C868] sm:text-xs">
                    {step.title}
                  </h3>

                  {step.description && (
                    <p className="mt-2 max-w-[180px] text-xs leading-5 text-white/50">
                      {step.description}
                    </p>
                  )}

                  <div className="mt-2.5 h-px w-6 bg-[#16C868]/40 transition-all duration-300 group-hover:w-9 group-hover:bg-[#16C868]" />

                  {index < steps.length - 1 && (
                    <div className="pointer-events-none absolute -bottom-6 left-1/2 flex -translate-x-1/2 items-center justify-center text-[#16C868]/40 sm:hidden">
                      <ArrowRight className="h-3 w-3 rotate-90" />
                    </div>
                  )}
                </motion.div>
              );
            })}
          </motion.div>
        </div>

        <motion.div
          initial={shouldReduceMotion ? false : { opacity: 0, y: 12 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={viewOnce}
          transition={{ duration: 0.6, delay: 0.25 }}
          className="mt-11 flex items-center justify-center gap-2.5 border-t border-white/10 pt-5 text-center"
        >
          <span className="h-1.5 w-1.5 rounded-full bg-[#16C868] shadow-[0_0_8px_rgba(22,200,104,0.6)]" />

          <p className="text-[11px] leading-5 text-white/50 sm:text-xs">
            Precision at every step. Quality in every detail.
          </p>
        </motion.div>
      </div>
    </section>
  );
}
