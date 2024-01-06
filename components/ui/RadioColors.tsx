import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";

interface RadioColorsProps {
  onColorSelect: (color: string) => void;
}

export function RadioColors({ onColorSelect }: RadioColorsProps) {
  return (
    <RadioGroup
      defaultValue="comfortable"
      className="flex flex-row py-3 px-4 "
      onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
        onColorSelect(e.target.id)
      }
    >
      <div className="flex items-center space-x-2">
        <RadioGroupItem
          value="red"
          id="0"
          className="bg-red-500 text-white border-transparent"
        />
      </div>
      <div className="flex items-center space-x-2">
        <RadioGroupItem
          value="blue"
          id="1"
          className="bg-blue-500 text-white border-transparent"
        />
      </div>
      <div className="flex items-center space-x-2">
        <RadioGroupItem
          value="green"
          id="2"
          className="bg-green-500 text-white border-transparent"
        />
      </div>
      <div className="flex items-center space-x-2">
        <RadioGroupItem
          value="yellow"
          id="3"
          className="bg-yellow-500 text-white border-transparent"
        />
      </div>
      <div className="flex items-center space-x-2">
        <RadioGroupItem
          value="purple"
          id="4"
          className="bg-purple-500 text-white border-transparent"
        />
      </div>
      <div className="flex items-center space-x-2">
        <RadioGroupItem
          value="pink"
          id="5"
          className="bg-pink-500 text-white border-transparent"
        />
      </div>
      <div className="flex items-center space-x-2">
        <RadioGroupItem
          value="black"
          id="6"
          className="bg-black text-white border-transparent"
        />
      </div>
    </RadioGroup>
  );
}
