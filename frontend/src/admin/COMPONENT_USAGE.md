# Admin Components Usage Examples

## Table of Contents
1. [StatsCard](#statscard)
2. [Table](#table)
3. [Modal](#modal)
4. [Badge](#badge)
5. [Alert](#alert)
6. [Complete Page Example](#complete-page-example)

---

## StatsCard

Display statistics with trend indicators.

### Basic Usage

```jsx
import StatsCard from '../components/StatsCard';
import { Users } from 'lucide-react';

<StatsCard
  title="Total Users"
  value="1,234"
  change="+12%"
  trend="up"
  icon={Users}
  color="blue"
  description="from last month"
/>
```

### Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| title | string | required | Card title |
| value | string/number | required | Main value to display |
| change | string | - | Change percentage/value |
| trend | 'up'/'down' | 'up' | Trend direction |
| icon | Component | - | Lucide icon component |
| color | string | 'blue' | Color theme: 'blue', 'green', 'yellow', 'red', 'purple' |
| description | string | 'from last month' | Description text |

### Example with Multiple Cards

```jsx
const stats = [
  {
    title: "Total Users",
    value: "1,234",
    change: "+12%",
    trend: "up",
    icon: Users,
    color: "blue",
  },
  {
    title: "Revenue",
    value: "₱45,678",
    change: "+8%",
    trend: "up",
    icon: DollarSign,
    color: "green",
  },
];

<div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
  {stats.map((stat, index) => (
    <StatsCard key={index} {...stat} />
  ))}
</div>
```

---

## Table

Reusable table component with loading and empty states.

### Basic Usage

```jsx
import Table from '../components/Table';

const columns = [
  {
    header: "Name",
    accessor: "name",
  },
  {
    header: "Email",
    accessor: "email",
  },
  {
    header: "Status",
    accessor: "status",
    render: (row) => (
      <Badge variant={row.status === 'active' ? 'success' : 'default'}>
        {row.status}
      </Badge>
    ),
  },
];

const data = [
  { id: 1, name: "John Doe", email: "john@example.com", status: "active" },
  { id: 2, name: "Jane Smith", email: "jane@example.com", status: "inactive" },
];

<Table
  columns={columns}
  data={data}
  onRowClick={(row) => console.log('Clicked:', row)}
  loading={false}
/>
```

### Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| columns | array | required | Array of column definitions |
| data | array | required | Array of data rows |
| onRowClick | function | - | Row click handler |
| loading | boolean | false | Loading state |

### Column Definition

```jsx
{
  header: "Column Name",        // Column header text
  accessor: "dataKey",          // Key to access data
  render: (row) => <div>...</div> // Optional custom render function
}
```

---

## Modal

Reusable modal dialog component.

### Basic Usage

```jsx
import Modal from '../components/Modal';
import { useState } from 'react';

const [isOpen, setIsOpen] = useState(false);

<Modal
  isOpen={isOpen}
  onClose={() => setIsOpen(false)}
  title="Create New User"
  size="lg"
  footer={
    <div className="flex justify-end space-x-3">
      <button
        onClick={() => setIsOpen(false)}
        className="px-4 py-2 text-gray-700 bg-gray-200 rounded-lg"
      >
        Cancel
      </button>
      <button
        onClick={handleSubmit}
        className="px-4 py-2 text-white bg-blue-600 rounded-lg"
      >
        Save
      </button>
    </div>
  }
>
  <form className="space-y-4">
    <div>
      <label className="block mb-2">Name</label>
      <input
        type="text"
        className="w-full px-4 py-2 border rounded-lg"
      />
    </div>
  </form>
</Modal>
```

### Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| isOpen | boolean | required | Modal open state |
| onClose | function | required | Close handler |
| title | string | required | Modal title |
| children | node | required | Modal content |
| size | string | 'md' | Modal size: 'sm', 'md', 'lg', 'xl', '2xl' |
| footer | node | - | Optional footer content |

---

## Badge

Status badge component.

### Basic Usage

```jsx
import Badge from '../components/Badge';

<Badge variant="success">Active</Badge>
<Badge variant="warning">Pending</Badge>
<Badge variant="danger">Inactive</Badge>
```

### Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| children | node | required | Badge text |
| variant | string | 'default' | Color variant |
| size | string | 'md' | Badge size |

### Variants

- `default` - Gray
- `primary` - Blue
- `success` - Green
- `warning` - Yellow
- `danger` - Red
- `info` - Cyan
- `purple` - Purple

### Sizes

- `sm` - Small
- `md` - Medium
- `lg` - Large

---

## Alert

Alert/notification component.

### Basic Usage

```jsx
import Alert from '../components/Alert';
import { useState } from 'react';

const [showAlert, setShowAlert] = useState(true);

{showAlert && (
  <Alert
    type="success"
    title="Success!"
    message="User created successfully."
    onClose={() => setShowAlert(false)}
    dismissible={true}
  />
)}
```

### Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| type | string | 'info' | Alert type |
| title | string | - | Alert title |
| message | string | - | Alert message |
| onClose | function | - | Close handler |
| dismissible | boolean | true | Can be dismissed |

### Types

- `success` - Green with checkmark
- `error` - Red with X
- `warning` - Yellow with alert
- `info` - Blue with info icon

---

## Complete Page Example

Here's a complete example of a page using all components:

```jsx
import React, { useState } from 'react';
import StatsCard from '../../components/StatsCard';
import Table from '../../components/Table';
import Modal from '../../components/Modal';
import Badge from '../../components/Badge';
import Alert from '../../components/Alert';
import { Users, FileText, Plus } from 'lucide-react';

const ExamplePage = () => {
  const [showModal, setShowModal] = useState(false);
  const [showAlert, setShowAlert] = useState(false);

  // Stats data
  const stats = [
    {
      title: "Total Users",
      value: "1,234",
      change: "+12%",
      trend: "up",
      icon: Users,
      color: "blue",
    },
    {
      title: "Reports",
      value: "456",
      change: "+8%",
      trend: "up",
      icon: FileText,
      color: "green",
    },
  ];

  // Table configuration
  const columns = [
    { header: "ID", accessor: "id" },
    { header: "Name", accessor: "name" },
    {
      header: "Status",
      accessor: "status",
      render: (row) => (
        <Badge
          variant={row.status === 'active' ? 'success' : 'default'}
        >
          {row.status}
        </Badge>
      ),
    },
  ];

  const data = [
    { id: 1, name: "John Doe", status: "active" },
    { id: 2, name: "Jane Smith", status: "inactive" },
  ];

  const handleCreate = () => {
    setShowModal(false);
    setShowAlert(true);
  };

  return (
    <div className="space-y-6">
      {/* Alert */}
      {showAlert && (
        <Alert
          type="success"
          title="Success!"
          message="Item created successfully."
          onClose={() => setShowAlert(false)}
        />
      )}

      {/* Page Header */}
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-bold">Example Page</h1>
        <button
          onClick={() => setShowModal(true)}
          className="flex items-center px-4 py-2 text-white bg-blue-600 rounded-lg"
        >
          <Plus className="w-4 h-4 mr-2" />
          Create New
        </button>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
        {stats.map((stat, index) => (
          <StatsCard key={index} {...stat} />
        ))}
      </div>

      {/* Table */}
      <div className="bg-white rounded-lg shadow dark:bg-gray-800">
        <div className="p-6 border-b">
          <h2 className="text-xl font-semibold">Data Table</h2>
        </div>
        <Table columns={columns} data={data} />
      </div>

      {/* Modal */}
      <Modal
        isOpen={showModal}
        onClose={() => setShowModal(false)}
        title="Create New Item"
        size="lg"
        footer={
          <div className="flex justify-end space-x-3">
            <button
              onClick={() => setShowModal(false)}
              className="px-4 py-2 bg-gray-200 rounded-lg"
            >
              Cancel
            </button>
            <button
              onClick={handleCreate}
              className="px-4 py-2 text-white bg-blue-600 rounded-lg"
            >
              Create
            </button>
          </div>
        }
      >
        <form className="space-y-4">
          <div>
            <label className="block mb-2">Name</label>
            <input
              type="text"
              className="w-full px-4 py-2 border rounded-lg"
              placeholder="Enter name"
            />
          </div>
        </form>
      </Modal>
    </div>
  );
};

export default ExamplePage;
```

---

## Tips and Best Practices

1. **Consistent Styling**: All components use Tailwind CSS and support dark mode
2. **Accessibility**: Components include proper ARIA attributes
3. **Reusability**: Import and use components across different pages
4. **Customization**: Override styles using className props where supported
5. **Type Safety**: Consider adding PropTypes or TypeScript for better type checking

## Additional Resources

- [Lucide Icons](https://lucide.dev/icons/) - Complete icon library
- [Tailwind CSS](https://tailwindcss.com/docs) - Utility classes reference
- [React Documentation](https://react.dev/) - React best practices
