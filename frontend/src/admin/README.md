# Admin Dashboard Module

## Overview
This is the admin dashboard module for the Barangay Culiat Management System. It provides a comprehensive interface for administrators to manage users, reports, announcements, and system settings.

## Folder Structure

```
src/admin/
├── components/          # Reusable admin components
│   ├── Header.jsx      # Top navigation bar with search, notifications, profile
│   └── Sidebar.jsx     # Collapsible sidebar navigation
│
├── layouts/            # Layout components
│   └── AdminLayout.jsx # Main admin layout wrapper (sidebar + header + content)
│
├── pages/              # Page components
│   ├── Dashboard/
│   │   └── AdminDashboard.jsx    # Main dashboard with stats and activity
│   ├── Users/
│   │   └── AdminUsers.jsx        # User management page
│   ├── Reports/
│   │   └── AdminReports.jsx      # Report management page
│   ├── Announcements/
│   │   └── AdminAnnouncements.jsx # Announcement management page
│   └── Settings/
│       └── SettingsPage.jsx      # System settings page
│
└── README.md           # This file
```

## Features

### 1. **AdminLayout**
- Responsive sidebar that collapses on mobile
- Persistent header with search, notifications, and user profile
- Dark mode support
- Mobile-friendly with overlay menu

### 2. **Dashboard Page**
- Statistics cards with trend indicators
- Recent reports list with status badges
- Activity feed showing recent system events
- Analytics overview section (placeholder for charts)

### 3. **Users Page**
- User listing with role and status filters
- Table view with pagination support
- Edit and delete actions
- User role badges (admin/resident)

### 4. **Reports Page**
- Report management with status filters
- Table view with report details
- Status tracking (pending/in-progress/resolved)
- Quick view actions

### 5. **Announcements Page**
- Announcement listing with status
- Create new announcement modal
- Edit and delete functionality
- View count tracking

### 6. **Settings Page**
- System configuration options
- Tabbed navigation for different setting categories
- Form validation
- Save/cancel actions

## Routing Structure

```javascript
/admin                    → Redirects to /admin/dashboard
/admin/dashboard         → Main admin dashboard
/admin/users             → User management
/admin/reports           → Report management
/admin/announcements     → Announcement management
/admin/analytics         → Analytics (future)
/admin/documents         → Document management (future)
/admin/calendar          → Calendar view (future)
/admin/notifications     → Notification center (future)
/admin/settings          → System settings
```

## Technologies Used

- **React 18+** - Frontend framework
- **React Router DOM** - Client-side routing
- **Tailwind CSS** - Utility-first CSS framework
- **Lucide React** - Icon library
- **Vite** - Build tool and dev server

## Component Props

### AdminLayout
```jsx
// No props - uses Outlet from react-router-dom
<AdminLayout />
```

### Sidebar
```jsx
<Sidebar 
  isOpen={boolean}           // Desktop sidebar state
  isMobileOpen={boolean}     // Mobile menu state
  closeMobileMenu={function} // Function to close mobile menu
/>
```

### Header
```jsx
<Header 
  toggleSidebar={function}      // Toggle desktop sidebar
  toggleMobileMenu={function}   // Toggle mobile menu
  isSidebarOpen={boolean}       // Current sidebar state
/>
```

## Styling

All components use Tailwind CSS with dark mode support:
- Light mode: Default
- Dark mode: Uses `dark:` prefix classes
- Responsive: Mobile-first approach with `sm:`, `md:`, `lg:`, `xl:` breakpoints

### Color Scheme
- Primary: Blue (#3B82F6)
- Success: Green (#10B981)
- Warning: Yellow (#F59E0B)
- Danger: Red (#EF4444)
- Gray scales for backgrounds and text

## Development Notes

### Adding New Pages

1. Create page component in `pages/` directory
2. Import in `App.jsx`
3. Add route in admin routes section:

```jsx
<Route path="new-page" element={<NewPage />} />
```

4. Add menu item in `Sidebar.jsx`:

```jsx
{ name: "New Page", path: "/admin/new-page", icon: IconComponent }
```

### State Management
Currently uses React hooks for local state. For global state, consider:
- Context API (already used for Auth)
- Zustand
- Redux Toolkit

### API Integration
Replace mock data with actual API calls:
```jsx
import { api } from '../users/services/api';

// In component
const fetchUsers = async () => {
  const response = await api.get('/admin/users');
  setUsers(response.data);
};
```

### Authentication
Admin routes are protected with `PrivateRoute` component.
Add role-based access control:
```jsx
// Check if user is admin
const { user } = useAuth();
if (user?.role !== 'admin') {
  return <Navigate to="/" />;
}
```

## Best Practices

1. **Component Organization**
   - Keep components small and focused
   - Extract reusable logic into custom hooks
   - Use proper prop validation

2. **Performance**
   - Use React.memo for expensive components
   - Implement pagination for large lists
   - Lazy load routes with React.lazy()

3. **Accessibility**
   - Use semantic HTML
   - Add ARIA labels where needed
   - Ensure keyboard navigation works
   - Test with screen readers

4. **Code Quality**
   - Follow ESLint rules
   - Write meaningful variable names
   - Add comments for complex logic
   - Keep functions pure when possible

## Future Enhancements

- [ ] Real-time notifications with WebSocket
- [ ] Advanced analytics with Chart.js/Recharts
- [ ] Export data functionality (CSV, PDF)
- [ ] Advanced search and filters
- [ ] Bulk actions for tables
- [ ] Role-based permissions management
- [ ] Activity logs and audit trail
- [ ] Email templates management
- [ ] File upload and management
- [ ] Mobile app integration

## Testing

```bash
# Run tests
npm test

# Run tests with coverage
npm test -- --coverage

# Run tests in watch mode
npm test -- --watch
```

## Support

For issues or questions, contact the development team or create an issue in the project repository.

## License

Proprietary - Barangay Culiat Management System
