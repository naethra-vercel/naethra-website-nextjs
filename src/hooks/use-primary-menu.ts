"use client";

import { useEffect, useState } from "react";

import {
  getPrimaryMenu,
  PRIMARY_MENU_FALLBACK,
  type NavigationItem,
} from "@/lib/navigation";

export function usePrimaryMenu(initialItems: NavigationItem[] = PRIMARY_MENU_FALLBACK) {
  const [items, setItems] = useState(initialItems);

  useEffect(() => {
    let active = true;
    void getPrimaryMenu().then((menuItems) => {
      if (active) setItems(menuItems);
    });
    return () => {
      active = false;
    };
  }, []);

  return items;
}
