import { useEffect, useMemo, useRef, useState } from "react";
import { FiArrowRight, FiCopy, FiDownload, FiGithub, FiLinkedin, FiMail, FiSearch } from "react-icons/fi";
import type { IconType } from "react-icons";
import { profile } from "../data/profile";
import { projects } from "../data/projects";
import { cvStyles } from "../lib/cv";
import { openProject } from "../lib/events";
import { sections } from "../lib/sections";
import Modal from "./Modal";

interface Command {
  id: string;
  label: string;
  hint: string;
  keywords: string;
  icon: IconType;
  run: () => void;
}

interface CommandPaletteProps {
  onClose: () => void;
}

function scrollToSection(id: string) {
  document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
}

function CommandPalette({ onClose }: CommandPaletteProps) {
  const [query, setQuery] = useState("");
  const [index, setIndex] = useState(0);
  const [copied, setCopied] = useState(false);
  const listRef = useRef<HTMLUListElement>(null);

  const commands = useMemo<Command[]>(() => {
    const go: Command[] = sections.map((s) => ({
      id: `go-${s.id}`,
      label: `Go to ${s.label}`,
      hint: "Section",
      keywords: s.id,
      icon: FiArrowRight,
      run: () => scrollToSection(s.id),
    }));
    const projectCommands: Command[] = projects.map((p) => ({
      id: `project-${p.id}`,
      label: `Open ${p.title}`,
      hint: p.category === "research" ? "Research" : "Project",
      keywords: `${p.tags.join(" ")} ${p.stack}`.toLowerCase(),
      icon: FiArrowRight,
      run: () => openProject(p.id),
    }));
    const cvs: Command[] = cvStyles.map((c) => ({
      id: `cv-${c.id}`,
      label: `Download CV (${c.label})`,
      hint: "PDF",
      keywords: "resume cv download pdf",
      icon: FiDownload,
      run: () => {
        const a = document.createElement("a");
        a.href = c.file;
        a.download = "";
        a.click();
      },
    }));
    const contact: Command[] = [
      {
        id: "email",
        label: "Send an email",
        hint: profile.email,
        keywords: "mail contact hire",
        icon: FiMail,
        run: () => {
          window.location.href = `mailto:${profile.email}`;
        },
      },
      {
        id: "copy-email",
        label: "Copy email address",
        hint: "Clipboard",
        keywords: "mail contact",
        icon: FiCopy,
        run: () => {
          void navigator.clipboard?.writeText(profile.email);
        },
      },
      {
        id: "github",
        label: "Open GitHub",
        hint: "External",
        keywords: "code repositories",
        icon: FiGithub,
        run: () => window.open(profile.github, "_blank", "noopener,noreferrer"),
      },
      {
        id: "linkedin",
        label: "Open LinkedIn",
        hint: "External",
        keywords: "profile network",
        icon: FiLinkedin,
        run: () => window.open(profile.linkedin, "_blank", "noopener,noreferrer"),
      },
    ];
    return [...go, ...projectCommands, ...cvs, ...contact];
  }, []);

  const results = useMemo(() => {
    const tokens = query.toLowerCase().split(/\s+/).filter(Boolean);
    if (tokens.length === 0) return commands;
    return commands.filter((c) => {
      const hay = `${c.label} ${c.hint} ${c.keywords}`.toLowerCase();
      return tokens.every((t) => hay.includes(t));
    });
  }, [commands, query]);

  useEffect(() => {
    listRef.current?.querySelector('[aria-selected="true"]')?.scrollIntoView({ block: "nearest" });
  }, [index, results]);

  const run = (cmd: Command | undefined) => {
    if (!cmd) return;
    if (cmd.id === "copy-email") {
      cmd.run();
      setCopied(true);
      window.setTimeout(onClose, 700);
      return;
    }
    onClose();
    // Let the dialog unmount and restore focus before navigating.
    window.setTimeout(cmd.run, 60);
  };

  const onKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "ArrowDown") {
      e.preventDefault();
      setIndex((i) => Math.min(i + 1, results.length - 1));
    } else if (e.key === "ArrowUp") {
      e.preventDefault();
      setIndex((i) => Math.max(i - 1, 0));
    } else if (e.key === "Enter") {
      e.preventDefault();
      run(results[index]);
    }
  };

  return (
    <Modal label="Command palette" onClose={onClose} size="md">
      <div className="pt-1">
        <div className="flex items-center gap-3 px-5 py-4 border-b border-line">
          <FiSearch aria-hidden="true" className="text-text-faint shrink-0" />
          <input
            autoFocus
            value={query}
            onChange={(e) => {
              setQuery(e.target.value);
              setIndex(0);
            }}
            onKeyDown={onKeyDown}
            placeholder="Jump to a section, open a project, download my CV…"
            aria-label="Search commands"
            role="combobox"
            aria-expanded="true"
            aria-controls="palette-list"
            aria-activedescendant={results[index] ? `cmd-${results[index].id}` : undefined}
            className="flex-1 bg-transparent outline-none text-text placeholder:text-text-faint text-sm pr-10"
          />
        </div>
        <ul id="palette-list" role="listbox" ref={listRef} className="max-h-[50vh] overflow-y-auto scrollbar-thin p-2">
          {results.length === 0 && <li className="px-4 py-8 text-center text-sm text-text-dim">Nothing matches “{query}”.</li>}
          {results.map((cmd, i) => {
            const Icon = cmd.icon;
            const selected = i === index;
            return (
              <li
                key={cmd.id}
                id={`cmd-${cmd.id}`}
                role="option"
                aria-selected={selected}
                onMouseMove={() => setIndex(i)}
                onClick={() => run(cmd)}
                className={`flex items-center gap-3 px-3 py-2.5 rounded-sm cursor-pointer ${selected ? "bg-bg-card text-text" : "text-text-dim"}`}
              >
                <Icon aria-hidden="true" className={selected ? "text-cyan" : "text-text-faint"} />
                <span className="flex-1 text-sm truncate">{copied && cmd.id === "copy-email" ? "Copied!" : cmd.label}</span>
                <span className="font-mono text-[11px] text-text-faint truncate max-w-[40%]">{cmd.hint}</span>
              </li>
            );
          })}
        </ul>
        <div className="flex items-center gap-4 px-5 py-3 border-t border-line font-mono text-[11px] text-text-faint">
          <span>↑↓ navigate</span>
          <span>↵ select</span>
          <span>esc close</span>
        </div>
      </div>
    </Modal>
  );
}

export default CommandPalette;
