export interface DropdownOption {
    value: string;
    label: string;
    hint?: string;
}
interface DropdownProps {
    value: string;
    options: DropdownOption[];
    onChange: (value: string) => void;
    /** Tiny caption rendered before the current value (e.g. "STATUS"). */
    label?: string;
}
interface MultiDropdownProps {
    values: string[];
    options: DropdownOption[];
    onChange: (values: string[]) => void;
    label?: string;
    /** Trigger text when nothing is selected (e.g. "* all models"). */
    emptyLabel?: string;
}
/** Multi-select flavour of the dropdown: rows toggle and the sheet stays
 *  open; the trigger sums the selection up. */
export declare function MultiDropdown({ values, options, onChange, label, emptyLabel }: MultiDropdownProps): import("react").JSX.Element;
/** Custom select: graphite trigger with a rotating chevron, dropdown sheet
 *  springs open with staggered rows. Closes on Esc / outside click. */
export declare function Dropdown({ value, options, onChange, label }: DropdownProps): import("react").JSX.Element;
export {};
//# sourceMappingURL=Dropdown.d.ts.map