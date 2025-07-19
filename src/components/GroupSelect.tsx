import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
} from "@/components/ui/select";
import { useGroups } from "@/hooks/group/useGroups";
import { useCreateGroup } from "@/hooks/group/useCreateGroup";
import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

export function GroupSelect({
  value,
  onChange,
}: {
  value?: string;
  onChange: (val?: string) => void;
}) {
  const { data: groups = [] } = useGroups();
  const createGroup = useCreateGroup();

  const [creating, setCreating] = useState(false);
  const [newGroupName, setNewGroupName] = useState("");

  const handleCreate = async () => {
    if (!newGroupName.trim()) return;
    const group = await createGroup.mutateAsync(newGroupName.trim());
    onChange(group._id);
    setCreating(false);
    setNewGroupName("");
  };

  return (
    <div className="space-y-2">
      <Select
        value={value ?? "__none__"}
        onValueChange={(val) => {
          if (val === "__create__") {
            setCreating(true);
          } else {
            onChange(val === "__none__" ? undefined : val);
          }
        }}
      >
        <SelectTrigger className="w-full">
          <SelectValue placeholder="Select a group (optional)" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="__none__">No Group</SelectItem>
          {groups.map((g) => (
            <SelectItem key={g._id} value={g._id}>
              {g.name}
            </SelectItem>
          ))}
          <SelectItem value="__create__">➕ Create new group...</SelectItem>
        </SelectContent>
      </Select>

      {creating && (
        <div className="flex gap-2">
          <Input
            placeholder="New group name"
            value={newGroupName}
            onChange={(e) => setNewGroupName(e.target.value)}
          />
          <Button
            type="button"
            onClick={handleCreate}
            disabled={createGroup.isPending}
          >
            {createGroup.isPending ? "Saving..." : "Add"}
          </Button>
          <Button
            variant="ghost"
            type="button"
            onClick={() => setCreating(false)}
          >
            Cancel
          </Button>
        </div>
      )}
    </div>
  );
}
