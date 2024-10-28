import RemindersListComponent from './components/reminder-list'

export default function RemindersPage() {
    return (

        <div className="container mx-auto py-8">
            <h1 className="text-3xl font-bold mb-6">Reminders</h1>
            <RemindersListComponent />
        </div>
    )
}