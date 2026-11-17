"use client";

import { CaretDown, Check } from "@phosphor-icons/react";
import { animate, stagger } from "animejs";
import {
  useEffect,
  useId,
  useRef,
  useState,
  type KeyboardEvent,
  type RefObject,
} from "react";

import { cn } from "@/lib/utils";

export type ModernDropdownOption = {
  value: string;
  label: string;
  description?: string;
};

type ModernDropdownProps = {
  options: ModernDropdownOption[];
  name?: string;
  placeholder?: string;
  value?: string;
  defaultValue?: string;
  onChange?: (value: string) => void;
  required?: boolean;
  disabled?: boolean;
  className?: string;
  triggerClassName?: string;
  variant?: "line" | "solid";
  id?: string;
  "aria-label"?: string;
};

function prefersReducedMotion() {
  return window.matchMedia("(prefers-reduced-motion: reduce)").matches;
}

function useClickOutside(ref: RefObject<HTMLElement | null>, active: boolean, onOutside: () => void) {
  const onOutsideRef = useRef(onOutside);
  onOutsideRef.current = onOutside;

  useEffect(() => {
    if (!active) return;

    const handlePointer = (event: MouseEvent | TouchEvent) => {
      const target = event.target;
      if (!(target instanceof Node)) return;
      if (!ref.current?.contains(target)) onOutsideRef.current();
    };

    document.addEventListener("mousedown", handlePointer);
    document.addEventListener("touchstart", handlePointer);
    return () => {
      document.removeEventListener("mousedown", handlePointer);
      document.removeEventListener("touchstart", handlePointer);
    };
  }, [active, ref]);
}

export function ModernDropdown({
  options,
  name,
  placeholder = "Select an option",
  value,
  defaultValue = "",
  onChange,
  required = false,
  disabled = false,
  className,
  triggerClassName,
  variant = "line",
  id,
  "aria-label": ariaLabel,
}: ModernDropdownProps) {
  const generatedId = useId();
  const listboxId = `${id ?? generatedId}-listbox`;
  const rootRef = useRef<HTMLDivElement>(null);
  const listRef = useRef<HTMLDivElement>(null);
  const [open, setOpen] = useState(false);
  const [internalValue, setInternalValue] = useState(defaultValue);
  const selectedValue = value ?? internalValue;
  const selected = options.find((option) => option.value === selectedValue);
  const [activeIndex, setActiveIndex] = useState(() =>
    Math.max(
      0,
      options.findIndex((option) => option.value === selectedValue),
    ),
  );

  useClickOutside(rootRef, open, () => setOpen(false));

  useEffect(() => {
    const form = rootRef.current?.closest("form");
    if (!form) return;

    const handleReset = () => {
      setInternalValue(defaultValue);
      setOpen(false);
      onChange?.(defaultValue);
    };

    form.addEventListener("reset", handleReset);
    return () => form.removeEventListener("reset", handleReset);
  }, [defaultValue, onChange]);

  useEffect(() => {
    if (!open || !listRef.current) return;

    const items = [...listRef.current.querySelectorAll<HTMLElement>("[data-dropdown-item]")];
    if (items.length === 0) return;

    if (prefersReducedMotion()) {
      items.forEach((item) => {
        item.style.opacity = "1";
        item.style.transform = "none";
      });
      return;
    }

    items.forEach((item) => {
      item.style.opacity = "0";
    });

    const animation = animate(items, {
      opacity: [0, 1],
      y: [10, 0],
      delay: stagger(36, { from: "first" }),
      duration: 420,
      ease: "outExpo",
      composition: "replace",
      onComplete: () => {
        items.forEach((item) => {
          item.style.opacity = "";
          item.style.transform = "";
        });
      },
    });

    return () => {
      animation.cancel();
    };
  }, [open]);

  function commit(next: string) {
    if (value === undefined) setInternalValue(next);
    onChange?.(next);
    setOpen(false);
  }

  function toggle() {
    if (disabled) return;
    setOpen((current) => {
      const next = !current;
      if (next) {
        const index = options.findIndex((option) => option.value === selectedValue);
        setActiveIndex(index >= 0 ? index : 0);
      }
      return next;
    });
  }

  function handleKeyDown(event: KeyboardEvent<HTMLButtonElement>) {
    if (disabled) return;

    if (event.key === "ArrowDown" || event.key === "ArrowUp") {
      event.preventDefault();
      if (!open) {
        setOpen(true);
        return;
      }
      setActiveIndex((index) => {
        if (event.key === "ArrowDown") return (index + 1) % options.length;
        return (index - 1 + options.length) % options.length;
      });
      return;
    }

    if (event.key === "Enter" || event.key === " ") {
      event.preventDefault();
      if (!open) {
        setOpen(true);
        return;
      }
      const option = options[activeIndex];
      if (option) commit(option.value);
      return;
    }

    if (event.key === "Escape") {
      setOpen(false);
      return;
    }

    if (event.key === "Home" && open) {
      event.preventDefault();
      setActiveIndex(0);
      return;
    }

    if (event.key === "End" && open) {
      event.preventDefault();
      setActiveIndex(Math.max(0, options.length - 1));
    }
  }

  return (
    <div
      ref={rootRef}
      className={cn("modern-dropdown", `modern-dropdown--${variant}`, open && "is-open", className)}
    >
      {name ? <input type="hidden" name={name} value={selectedValue} required={required} /> : null}

      <button
        id={id}
        type="button"
        className={cn("modern-dropdown-trigger", triggerClassName)}
        aria-haspopup="listbox"
        aria-expanded={open}
        aria-controls={listboxId}
        aria-label={ariaLabel ?? placeholder}
        disabled={disabled}
        onClick={toggle}
        onKeyDown={handleKeyDown}
      >
        <span className={cn("modern-dropdown-value", !selected && "is-placeholder")}>
          {selected?.label ?? placeholder}
        </span>
        <CaretDown className="modern-dropdown-caret" size={16} weight="bold" aria-hidden="true" />
      </button>

      {open ? (
        <div
          ref={listRef}
          id={listboxId}
          className="modern-dropdown-panel"
          role="listbox"
          aria-label={ariaLabel ?? placeholder}
        >
          <div className="modern-dropdown-glow" aria-hidden="true" />
          <p className="modern-dropdown-label">Choose one</p>
          <div className="modern-dropdown-list">
            {options.map((option, index) => {
              const isSelected = option.value === selectedValue;
              const isActive = index === activeIndex;

              return (
                <button
                  key={option.value}
                  type="button"
                  role="option"
                  data-dropdown-item
                  aria-selected={isSelected}
                  className={cn(
                    "modern-dropdown-item",
                    isSelected && "is-selected",
                    isActive && "is-active",
                  )}
                  onMouseEnter={() => setActiveIndex(index)}
                  onClick={() => commit(option.value)}
                >
                  <span className="modern-dropdown-copy">
                    <span className="modern-dropdown-title">{option.label}</span>
                    {option.description ? (
                      <span className="modern-dropdown-desc">{option.description}</span>
                    ) : null}
                  </span>
                  <Check
                    className="modern-dropdown-check"
                    size={16}
                    weight="bold"
                    aria-hidden="true"
                  />
                </button>
              );
            })}
          </div>
        </div>
      ) : null}
    </div>
  );
}
