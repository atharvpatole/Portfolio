'use client';

import { AnimatePresence, motion } from 'framer-motion';
import { useEffect, useMemo, useRef, useState, type KeyboardEvent } from 'react';
import { profile } from '@/content/profile';
import { ease } from '@/components/motion/variants';

type PaletteItem = {
  id: string;
  label: string;
  hint: string;
  action: () => void;
};

function scrollToSection(id: string) {
  return () => {
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth', block: 'start' });
  };
}

function downloadResume() {
  const link = document.createElement('a');
  link.href = '/Atharv-Patole-Resume.pdf';
  link.download = 'Atharv-Patole-Resume.pdf';
  link.click();
}

export function CommandPalette() {
  const [open, setOpen] = useState(false);
  const [query, setQuery] = useState('');
  const [activeIndex, setActiveIndex] = useState(0);
  const inputRef = useRef<HTMLInputElement>(null);
  const triggerRef = useRef<HTMLElement | null>(null);

  const items = useMemo<PaletteItem[]>(
    () => [
      { id: 'about', label: 'About', hint: 'section', action: scrollToSection('about') },
      { id: 'skills', label: 'Skills', hint: 'section', action: scrollToSection('skills') },
      {
        id: 'experience',
        label: 'Experience',
        hint: 'section',
        action: scrollToSection('experience'),
      },
      {
        id: 'projects',
        label: 'Projects',
        hint: 'section',
        action: scrollToSection('selected-work'),
      },
      {
        id: 'achievements',
        label: 'Achievements',
        hint: 'section',
        action: scrollToSection('achievements'),
      },
      { id: 'contact', label: 'Contact', hint: 'section', action: scrollToSection('contact') },
      { id: 'resume', label: 'Download resume', hint: 'pdf', action: downloadResume },
      {
        id: 'email',
        label: 'Email',
        hint: profile.email,
        action: () => {
          window.location.href = `mailto:${profile.email}`;
        },
      },
      ...profile.links.map((link) => ({
        id: link.label.toLowerCase(),
        label: link.label,
        hint: link.href.replace(/^https?:\/\//, ''),
        action: () => window.open(link.href, '_blank', 'noopener,noreferrer'),
      })),
    ],
    [],
  );

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    if (!q) return items;
    return items.filter((item) => item.label.toLowerCase().includes(q));
  }, [items, query]);

  // The active row resets whenever the list it indexes into changes, so a stale
  // index from a previous hover or a longer list never points past the end.
  useEffect(() => {
    setActiveIndex(0);
  }, [query]);

  useEffect(() => {
    function handleKeydown(event: globalThis.KeyboardEvent) {
      if ((event.metaKey || event.ctrlKey) && event.key.toLowerCase() === 'k') {
        event.preventDefault();
        setOpen((prev) => !prev);
      }
    }
    window.addEventListener('keydown', handleKeydown);
    return () => window.removeEventListener('keydown', handleKeydown);
  }, []);

  useEffect(() => {
    if (open) {
      triggerRef.current = document.activeElement as HTMLElement;
      setQuery('');
      setActiveIndex(0);
      const frame = requestAnimationFrame(() => inputRef.current?.focus());
      return () => cancelAnimationFrame(frame);
    }
    triggerRef.current?.focus?.();
  }, [open]);

  function runItem(item: PaletteItem) {
    item.action();
    setOpen(false);
  }

  function handleInputKeydown(event: KeyboardEvent<HTMLInputElement>) {
    if (event.key === 'ArrowDown') {
      event.preventDefault();
      setActiveIndex((prev) => Math.min(prev + 1, filtered.length - 1));
    } else if (event.key === 'ArrowUp') {
      event.preventDefault();
      setActiveIndex((prev) => Math.max(prev - 1, 0));
    } else if (event.key === 'Enter') {
      event.preventDefault();
      const item = filtered[Math.min(activeIndex, filtered.length - 1)];
      if (item) runItem(item);
    } else if (event.key === 'Escape') {
      setOpen(false);
    }
  }

  return (
    <>
      <button
        type="button"
        onClick={() => setOpen(true)}
        className="fixed bottom-5 right-5 z-40 hidden items-center gap-2 border border-contour/40 bg-mylar px-3 py-2 font-mono text-data text-contour transition-colors hover:border-contour md:flex"
      >
        <span>Quick nav</span>
        <kbd className="border border-contour/40 px-1.5 py-0.5 text-[11px]">Ctrl K</kbd>
      </button>

      <AnimatePresence>
        {open ? (
          <motion.div
            className="fixed inset-0 z-50 flex items-start justify-center px-4 pt-[15vh]"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.15 }}
          >
            <motion.div
              aria-hidden="true"
              className="absolute inset-0 bg-ink/40"
              onClick={() => setOpen(false)}
            />
            <motion.div
              role="dialog"
              aria-modal="true"
              aria-label="Quick navigation"
              initial={{ opacity: 0, y: -12, scale: 0.98 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: -8, scale: 0.98 }}
              transition={{ duration: 0.18, ease }}
              className="relative w-full max-w-[32rem] border border-contour bg-mylar"
            >
              <input
                ref={inputRef}
                value={query}
                onChange={(event) => setQuery(event.target.value)}
                onKeyDown={handleInputKeydown}
                placeholder="Jump to a section or link..."
                className="w-full border-b border-contour/40 bg-transparent px-5 py-4 text-body text-ink outline-none placeholder:text-contour/60"
              />
              <ul className="max-h-[18rem] overflow-y-auto py-2">
                {filtered.length === 0 ? (
                  <li className="px-5 py-4 text-meta text-contour">No matches.</li>
                ) : (
                  filtered.map((item, index) => (
                    <li key={item.id}>
                      <button
                        type="button"
                        onMouseEnter={() => setActiveIndex(index)}
                        onClick={() => runItem(item)}
                        className={`flex w-full items-center justify-between px-5 py-3 text-left text-body ${
                          index === activeIndex ? 'bg-ink text-mylar' : 'text-ink'
                        }`}
                      >
                        <span>{item.label}</span>
                        <span
                          className={`font-mono text-data ${
                            index === activeIndex ? 'text-mylar/70' : 'text-contour'
                          }`}
                        >
                          {item.hint}
                        </span>
                      </button>
                    </li>
                  ))
                )}
              </ul>
            </motion.div>
          </motion.div>
        ) : null}
      </AnimatePresence>
    </>
  );
}
