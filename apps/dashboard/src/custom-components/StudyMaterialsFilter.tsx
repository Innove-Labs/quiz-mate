import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

export default function StudyMaterialsFilter() {
    return (
        <div className="w-full flex flex-col md:flex-row justify-end items-center gap-4">
            {/* Class Filter */}
            <Select>
                <SelectTrigger className="w-[200px]">
                    <SelectValue placeholder="Select Class" />
                </SelectTrigger>
                <SelectContent>
                    <SelectItem value="class-1">Class 1</SelectItem>
                    <SelectItem value="class-2">Class 2</SelectItem>
                    <SelectItem value="class-3">Class 3</SelectItem>
                </SelectContent>
            </Select>

            {/* Subject Filter */}
            <Select>
                <SelectTrigger className="w-[200px]">
                    <SelectValue placeholder="Select Subject" />
                </SelectTrigger>
                <SelectContent>
                    <SelectItem value="math">Mathematics</SelectItem>
                    <SelectItem value="science">Science</SelectItem>
                    <SelectItem value="english">English</SelectItem>
                </SelectContent>
            </Select>

            {/* Upload Button */}
            <Button className="bg-[var(--primary-color)]">Upload</Button>
        </div>
    );
}
