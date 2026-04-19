type TaskSearchProps = {
    value: string
    onChange: (value: string) => void
    placeholder?: string
}

export default function TaskSearch({ value, onChange, placeholder = "Search tasks by title or description…" }: TaskSearchProps) {
    return (
        <div className="w-full max-w-md">
            <label htmlFor="task-search" className="sr-only">
                Search tasks
            </label>
            <input
                id="task-search"
                type="search"
                value={value}
                onChange={(e) => onChange(e.target.value)}
                placeholder={placeholder}
                className="w-full border border-gray-200 rounded-md px-4 py-2 text-textBlack placeholder:text-textGray focus:outline-none focus:ring-2 focus:ring-textPurple/30"
            />
        </div>
    )
}
