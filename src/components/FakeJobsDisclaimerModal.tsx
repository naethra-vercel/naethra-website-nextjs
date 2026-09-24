import React, { useState, useEffect } from "react";
import { HugeiconsIcon } from "@hugeicons/react";
import {
  Cancel01Icon,
  CheckmarkCircle02Icon,
  AlertCircleIcon,
  Building02Icon,
} from "@hugeicons/core-free-icons";

const DISCLAIMER_SESSION_KEY = "naethra-fake-jobs-disclaimer-seen";

export function FakeJobsDisclaimerModal() {
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    if (window.sessionStorage.getItem(DISCLAIMER_SESSION_KEY) !== "true") {
      setIsOpen(true);
    }
  }, []);

  const dismiss = () => {
    window.sessionStorage.setItem(DISCLAIMER_SESSION_KEY, "true");
    setIsOpen(false);
  };

  // Lock background page body scroll when modal is open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [isOpen]);

  if (!isOpen) return null;

  return (
    <div
      data-lenis-prevent="true"
      data-lenis-prevent-wheel="true"
      data-lenis-prevent-touch="true"
      className="fixed inset-0 z-[99999] flex items-center justify-center bg-slate-900/60 backdrop-blur-sm p-4 md:p-6 overflow-y-auto animate-in fade-in duration-300"
      onClick={(e) => {
        if (e.target === e.currentTarget) {
          dismiss();
        }
      }}
    >
      <div
        data-lenis-prevent="true"
        data-lenis-prevent-wheel="true"
        data-lenis-prevent-touch="true"
        className="relative w-full max-w-5xl max-h-[90vh] overflow-y-auto rounded-2xl bg-white p-6 md:p-8 text-[#142033] shadow-2xl border border-slate-200 font-sans leading-relaxed my-auto scrollbar-thin scrollbar-thumb-[#005b96]"
      >
        {/* Top Right Close Button */}
        <button
          type="button"
          onClick={dismiss}
          className="absolute top-5 right-5 flex size-9 items-center justify-center rounded-full bg-[#005b96] text-white transition-all hover:bg-[#061d45] hover:scale-105 shadow-md"
          aria-label="Close disclaimer modal"
        >
          <HugeiconsIcon icon={Cancel01Icon} size={18} />
        </button>

        {/* Clean Header Section (No Top Icon Card) */}
        <div className="flex flex-col items-start border-b border-slate-200 pb-4 mb-5 pr-10">
          <span className="inline-flex items-center gap-1.5 rounded-full bg-[#e8edf6] border border-[#005b96]/30 px-3 py-1 text-xs font-bold text-[#005b96] tracking-wider uppercase mb-1.5">
            <HugeiconsIcon icon={AlertCircleIcon} size={14} />
            IMPORTANT NOTICE
          </span>
          <h2 className="text-2xl md:text-3xl font-bold text-[#005b96] tracking-tight">
            Fake Jobs: Disclaimer and Notification
          </h2>
          <p className="text-xs md:text-sm text-slate-500 mt-0.5">
            Official Recruitment Integrity Advisory from Naethra Technologies Pvt. Ltd.
          </p>
        </div>

        {/* Wide 2-Column Content Layout to Reduce Scrolling */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-5 text-xs md:text-sm text-slate-700">
          {/* Left Column */}
          <div className="space-y-4 flex flex-col justify-between">
            {/* Merit-Based Selection Box */}
            <div className="rounded-xl bg-[#f3f5fa] border-l-4 border-[#005b96] p-4 flex items-start gap-3">
              <div className="text-[#005b96] shrink-0 mt-0.5">
                <HugeiconsIcon icon={CheckmarkCircle02Icon} size={20} />
              </div>
              <div>
                <h3 className="font-bold text-[#005b96] text-sm">Strictly Merit-Based Selection</h3>
                <p className="text-slate-600 mt-1">
                  Naethra Technologies conducts all recruitment activities through a{" "}
                  <strong className="text-slate-900 font-bold">strictly merit-based process</strong>
                  . At no stage do we solicit or accept payments, fees, or security deposits from
                  candidates.
                </p>
              </div>
            </div>

            {/* Official Verification Box */}
            <div className="rounded-xl border border-slate-200 bg-slate-50 p-4 space-y-1.5">
              <div className="flex items-center gap-2 font-bold text-[#005b96] text-xs uppercase tracking-wider">
                <HugeiconsIcon icon={Building02Icon} size={16} />
                <span>Official Verification Channel</span>
              </div>
              <p className="text-xs text-slate-600">
                Verify all communications through our official contact details on our website.
                Naethra Technologies will not be responsible for any loss or financial damage
                arising from fraudulent third-party offers.
              </p>
            </div>
          </div>

          {/* Right Column */}
          <div className="space-y-4 flex flex-col justify-between">
            {/* Fraudulent Offers Advisory */}
            <div className="space-y-2 text-xs md:text-sm text-slate-700 bg-amber-500/5 border border-amber-500/20 rounded-xl p-4">
              <h4 className="font-bold text-slate-900 text-xs uppercase tracking-wider text-amber-800">
                Fraud Alert &amp; Policy
              </h4>
              <p>
                Unauthorized entities are issuing fake job offers using our name and logo. Naethra
                Technologies{" "}
                <strong className="text-slate-900 font-bold">
                  never requests credit card details, bank info, or fees
                </strong>{" "}
                for recruitment, contests, or marketing events.
              </p>
            </div>

            {/* Legal Disclaimer Box */}
            <div className="rounded-xl border border-slate-200 p-4 space-y-1 bg-slate-50/50">
              <h4 className="font-bold text-slate-900 text-xs uppercase tracking-wider">
                Legal Disclaimer
              </h4>
              <p className="text-xs text-slate-600 leading-relaxed">
                Naethra Technologies Pvt. Ltd. reserves all rights to initiate appropriate{" "}
                <strong className="text-slate-900 font-semibold">
                  civil and/or criminal legal proceedings
                </strong>{" "}
                against individuals or entities involved in identity theft, fraud, or
                misrepresentation.
              </p>
            </div>
          </div>
        </div>

        {/* Footer Action Bar */}
        <div className="mt-5 pt-4 border-t border-slate-200 flex items-center justify-end">
          <button
            type="button"
            onClick={dismiss}
            className="w-full sm:w-auto rounded-full bg-[#005b96] hover:bg-[#061d45] text-white px-8 py-2.5 text-xs font-bold shadow-md transition-all hover:scale-[1.02] active:scale-95"
          >
            I Acknowledge &amp; Understand
          </button>
        </div>
      </div>
    </div>
  );
}
