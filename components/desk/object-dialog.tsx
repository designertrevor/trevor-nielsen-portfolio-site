"use client";

import { useState } from "react";

import { type DeskObjectId, DESK_OBJECTS } from "@/components/desk/desk-objects";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";

/* What opens when you pick something up off the desk */
export function ObjectDialog({ id, onClose }: { id: DeskObjectId | null; onClose: () => void }) {
  const obj = id ? DESK_OBJECTS[id] : null;
  return (
    <Dialog open={!!obj} onOpenChange={(open) => !open && onClose()}>
      <DialogContent className="border border-foreground bg-background p-6 shadow-[6px_6px_0_0_var(--shadow-sand)] sm:max-w-md">
        {obj && (
          <>
            <DialogHeader>
              <DialogTitle className="font-serif text-2xl font-semibold">{obj.title}</DialogTitle>
              <DialogDescription>{obj.body}</DialogDescription>
            </DialogHeader>
            {id === "photos" && obj.items ? (
              <PhotoCycler items={obj.items} />
            ) : (
              obj.items && (
                <ul className="flex flex-col gap-3">
                  {obj.items.map((item) => (
                    <li key={item.name} className="bg-tint-blue p-4">
                      <p className="font-semibold">{item.name}</p>
                      <p className="mt-1 text-muted-foreground">{item.note}</p>
                    </li>
                  ))}
                </ul>
              )
            )}
          </>
        )}
      </DialogContent>
    </Dialog>
  );
}

function PhotoCycler({ items }: { items: { name: string; note: string }[] }) {
  const [i, setI] = useState(0);
  const step = (d: number) => setI((n) => (n + d + items.length) % items.length);
  const item = items[i];
  return (
    <div className="flex flex-col gap-3">
      <div className="flex aspect-[4/3] flex-col items-center justify-center gap-1 bg-tint-pink text-center">
        <p className="font-serif text-2xl font-semibold">{item.name}</p>
        <p className="text-muted-foreground">{item.note}</p>
      </div>
      <div className="flex items-center justify-between">
        <Button variant="outline" onClick={() => step(-1)}>
          Previous
        </Button>
        <span className="text-xs text-muted-foreground tabular-nums">
          {i + 1} / {items.length}
        </span>
        <Button variant="outline" onClick={() => step(1)}>
          Next
        </Button>
      </div>
    </div>
  );
}
