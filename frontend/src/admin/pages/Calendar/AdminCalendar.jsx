import React, { useState, useRef } from "react";
import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import timeGridPlugin from "@fullcalendar/timegrid";
import interactionPlugin from "@fullcalendar/interaction";
import listPlugin from "@fullcalendar/list";
import {
  Calendar as CalendarIcon,
  Plus,
  X,
  Clock,
  MapPin,
  User,
  FileText,
  AlertCircle,
} from "lucide-react";

const AdminCalendar = () => {
  const calendarRef = useRef(null);
  const [showEventModal, setShowEventModal] = useState(false);
  const [selectedEvent, setSelectedEvent] = useState(null);
  const [showAddModal, setShowAddModal] = useState(false);
  const [selectedDate, setSelectedDate] = useState(null);

  // Mock events data
  const [events, setEvents] = useState([
    {
      id: "1",
      title: "Document Pickup - Juan Dela Cruz",
      start: "2025-11-05T10:00:00",
      end: "2025-11-05T10:30:00",
      backgroundColor: "#3B82F6",
      borderColor: "#3B82F6",
      extendedProps: {
        type: "pickup",
        resident: "Juan Dela Cruz",
        document: "Barangay Clearance",
        location: "Barangay Hall - Window 3",
        status: "confirmed",
      },
    },
    {
      id: "2",
      title: "Community Meeting",
      start: "2025-11-08T14:00:00",
      end: "2025-11-08T16:00:00",
      backgroundColor: "#10B981",
      borderColor: "#10B981",
      extendedProps: {
        type: "meeting",
        location: "Barangay Hall - Conference Room",
        attendees: 25,
        status: "scheduled",
      },
    },
    {
      id: "3",
      title: "Health Check-up Program",
      start: "2025-11-12",
      end: "2025-11-12",
      backgroundColor: "#8B5CF6",
      borderColor: "#8B5CF6",
      extendedProps: {
        type: "event",
        location: "Barangay Covered Court",
        description: "Free health check-up for all residents",
        status: "upcoming",
      },
    },
    {
      id: "4",
      title: "Document Pickup - Maria Santos",
      start: "2025-11-15T09:00:00",
      end: "2025-11-15T09:30:00",
      backgroundColor: "#3B82F6",
      borderColor: "#3B82F6",
      extendedProps: {
        type: "pickup",
        resident: "Maria Santos",
        document: "Certificate of Residency",
        location: "Barangay Hall - Window 2",
        status: "confirmed",
      },
    },
    {
      id: "5",
      title: "Barangay Assembly",
      start: "2025-11-20T15:00:00",
      end: "2025-11-20T18:00:00",
      backgroundColor: "#F59E0B",
      borderColor: "#F59E0B",
      extendedProps: {
        type: "assembly",
        location: "Barangay Covered Court",
        attendees: 150,
        status: "scheduled",
      },
    },
  ]);

  const [newEvent, setNewEvent] = useState({
    title: "",
    start: "",
    end: "",
    type: "meeting",
    location: "",
    description: "",
  });

  const handleDateClick = (info) => {
    setSelectedDate(info.dateStr);
    setNewEvent({
      ...newEvent,
      start: info.dateStr,
      end: info.dateStr,
    });
    setShowAddModal(true);
  };

  const handleEventClick = (info) => {
    setSelectedEvent({
      ...info.event,
      extendedProps: info.event.extendedProps,
    });
    setShowEventModal(true);
  };

  const handleAddEvent = () => {
    const eventColors = {
      pickup: { bg: "#3B82F6", border: "#3B82F6" },
      meeting: { bg: "#10B981", border: "#10B981" },
      event: { bg: "#8B5CF6", border: "#8B5CF6" },
      assembly: { bg: "#F59E0B", border: "#F59E0B" },
    };

    const color = eventColors[newEvent.type] || eventColors.meeting;

    const event = {
      id: String(events.length + 1),
      title: newEvent.title,
      start: newEvent.start,
      end: newEvent.end,
      backgroundColor: color.bg,
      borderColor: color.border,
      extendedProps: {
        type: newEvent.type,
        location: newEvent.location,
        description: newEvent.description,
        status: "scheduled",
      },
    };

    setEvents([...events, event]);
    setShowAddModal(false);
    setNewEvent({
      title: "",
      start: "",
      end: "",
      type: "meeting",
      location: "",
      description: "",
    });
  };

  const handleDeleteEvent = (eventId) => {
    setEvents(events.filter((e) => e.id !== eventId));
    setShowEventModal(false);
  };

  const getEventIcon = (type) => {
    switch (type) {
      case "pickup":
        return FileText;
      case "meeting":
        return User;
      case "event":
        return CalendarIcon;
      case "assembly":
        return User;
      default:
        return CalendarIcon;
    }
  };

  const getStatusColor = (status) => {
    switch (status) {
      case "confirmed":
        return "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300";
      case "scheduled":
        return "bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-300";
      case "upcoming":
        return "bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-300";
      default:
        return "bg-gray-100 text-gray-800 dark:bg-gray-900 dark:text-gray-300";
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white">
            Calendar & Events
          </h1>
          <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">
            Manage appointments, meetings, and barangay events
          </p>
        </div>
        <button
          onClick={() => setShowAddModal(true)}
          className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
        >
          <Plus className="w-5 h-5" />
          Add Event
        </button>
      </div>

      {/* Legend */}
      <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-4">
        <div className="flex flex-wrap gap-4">
          <div className="flex items-center gap-2">
            <div className="w-4 h-4 bg-blue-500 rounded"></div>
            <span className="text-sm text-gray-700 dark:text-gray-300">
              Document Pickup
            </span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-4 h-4 bg-green-500 rounded"></div>
            <span className="text-sm text-gray-700 dark:text-gray-300">
              Meeting
            </span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-4 h-4 bg-purple-500 rounded"></div>
            <span className="text-sm text-gray-700 dark:text-gray-300">
              Barangay Event
            </span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-4 h-4 bg-yellow-500 rounded"></div>
            <span className="text-sm text-gray-700 dark:text-gray-300">
              Assembly
            </span>
          </div>
        </div>
      </div>

      {/* Calendar */}
      <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-6">
        <style>{`
          /* Dark theme styles for FullCalendar */
          .dark .fc {
            --fc-border-color: #374151;
            --fc-button-bg-color: #3B82F6;
            --fc-button-border-color: #3B82F6;
            --fc-button-hover-bg-color: #2563EB;
            --fc-button-hover-border-color: #2563EB;
            --fc-button-active-bg-color: #1D4ED8;
            --fc-button-active-border-color: #1D4ED8;
            --fc-today-bg-color: rgba(59, 130, 246, 0.1);
          }
          
          .dark .fc .fc-button {
            background-color: #3B82F6;
            border-color: #3B82F6;
            color: white;
          }
          
          .dark .fc .fc-button:hover {
            background-color: #2563EB;
            border-color: #2563EB;
          }
          
          .dark .fc .fc-button-active {
            background-color: #1D4ED8 !important;
            border-color: #1D4ED8 !important;
          }
          
          .dark .fc .fc-button:disabled {
            background-color: #4B5563;
            border-color: #4B5563;
            opacity: 0.5;
          }
          
          .dark .fc-theme-standard th {
            background-color: #1F2937;
            border-color: #374151;
            color: #E5E7EB;
          }
          
          .dark .fc-theme-standard td {
            border-color: #374151;
            background-color: #111827;
          }
          
          .dark .fc-theme-standard .fc-scrollgrid {
            border-color: #374151;
          }
          
          .dark .fc .fc-col-header-cell {
            background-color: #1F2937;
            color: #E5E7EB;
            font-weight: 600;
          }
          
          .dark .fc .fc-daygrid-day-number {
            color: #D1D5DB;
          }
          
          .dark .fc .fc-daygrid-day.fc-day-today {
            background-color: rgba(59, 130, 246, 0.15) !important;
          }
          
          .dark .fc .fc-daygrid-day.fc-day-today .fc-daygrid-day-number {
            color: #60A5FA;
            font-weight: bold;
          }
          
          .dark .fc .fc-daygrid-day-top {
            color: #D1D5DB;
          }
          
          .dark .fc .fc-toolbar-title {
            color: #F3F4F6;
            font-size: 1.5rem;
            font-weight: 700;
          }
          
          .dark .fc .fc-list {
            border-color: #374151;
          }
          
          .dark .fc .fc-list-day-cushion {
            background-color: #1F2937;
            color: #E5E7EB;
          }
          
          .dark .fc .fc-list-event:hover td {
            background-color: #1F2937;
          }
          
          .dark .fc .fc-list-event-time,
          .dark .fc .fc-list-event-title {
            color: #D1D5DB;
          }
          
          .dark .fc .fc-daygrid-more-link {
            color: #60A5FA;
          }
          
          .dark .fc .fc-daygrid-more-link:hover {
            background-color: #1F2937;
          }
          
          /* Light theme enhancements */
          .fc .fc-toolbar-title {
            font-size: 1.5rem;
            font-weight: 700;
          }
          
          .fc .fc-button {
            padding: 0.5rem 1rem;
            font-weight: 500;
          }
          
          .fc .fc-col-header-cell {
            padding: 0.75rem;
            font-weight: 600;
          }
          
          .fc .fc-daygrid-day-number {
            padding: 0.5rem;
            font-weight: 500;
          }
        `}</style>
        
        <FullCalendar
          ref={calendarRef}
          plugins={[dayGridPlugin, timeGridPlugin, interactionPlugin, listPlugin]}
          initialView="dayGridMonth"
          headerToolbar={{
            left: "prev,next today",
            center: "title",
            right: "dayGridMonth,timeGridWeek,timeGridDay,listWeek",
          }}
          buttonText={{
            today: "Today",
            month: "Month",
            week: "Week",
            day: "Day",
            list: "List",
          }}
          events={events}
          editable={true}
          selectable={true}
          selectMirror={true}
          dayMaxEvents={true}
          weekends={true}
          dateClick={handleDateClick}
          eventClick={handleEventClick}
          height="auto"
          eventContent={(eventInfo) => {
            return (
              <div className="p-1">
                <div className="font-medium text-xs truncate">
                  {eventInfo.timeText && (
                    <span className="mr-1">{eventInfo.timeText}</span>
                  )}
                  {eventInfo.event.title}
                </div>
              </div>
            );
          }}
        />
      </div>

      {/* Event Details Modal */}
      {showEventModal && selectedEvent && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white dark:bg-gray-800 rounded-lg max-w-2xl w-full max-h-[90vh] overflow-y-auto">
            <div className="sticky top-0 bg-white dark:bg-gray-800 border-b border-gray-200 dark:border-gray-700 px-6 py-4 flex items-center justify-between">
              <h2 className="text-2xl font-bold text-gray-900 dark:text-white">
                Event Details
              </h2>
              <button
                onClick={() => setShowEventModal(false)}
                className="text-gray-400 hover:text-gray-600 dark:hover:text-gray-300"
              >
                <X className="w-6 h-6" />
              </button>
            </div>

            <div className="px-6 py-4 space-y-4">
              <div>
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">
                  {selectedEvent.title}
                </h3>
                <span
                  className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${getStatusColor(
                    selectedEvent.extendedProps?.status
                  )}`}
                >
                  {selectedEvent.extendedProps?.status}
                </span>
              </div>

              <div className="space-y-3">
                <div className="flex items-start gap-3">
                  <Clock className="w-5 h-5 text-gray-400 mt-0.5" />
                  <div>
                    <p className="text-sm font-medium text-gray-700 dark:text-gray-300">
                      Date & Time
                    </p>
                    <p className="text-sm text-gray-600 dark:text-gray-400">
                      {selectedEvent.start?.toLocaleString()}
                      {selectedEvent.end && ` - ${selectedEvent.end.toLocaleString()}`}
                    </p>
                  </div>
                </div>

                {selectedEvent.extendedProps?.location && (
                  <div className="flex items-start gap-3">
                    <MapPin className="w-5 h-5 text-gray-400 mt-0.5" />
                    <div>
                      <p className="text-sm font-medium text-gray-700 dark:text-gray-300">
                        Location
                      </p>
                      <p className="text-sm text-gray-600 dark:text-gray-400">
                        {selectedEvent.extendedProps.location}
                      </p>
                    </div>
                  </div>
                )}

                {selectedEvent.extendedProps?.resident && (
                  <div className="flex items-start gap-3">
                    <User className="w-5 h-5 text-gray-400 mt-0.5" />
                    <div>
                      <p className="text-sm font-medium text-gray-700 dark:text-gray-300">
                        Resident
                      </p>
                      <p className="text-sm text-gray-600 dark:text-gray-400">
                        {selectedEvent.extendedProps.resident}
                      </p>
                    </div>
                  </div>
                )}

                {selectedEvent.extendedProps?.document && (
                  <div className="flex items-start gap-3">
                    <FileText className="w-5 h-5 text-gray-400 mt-0.5" />
                    <div>
                      <p className="text-sm font-medium text-gray-700 dark:text-gray-300">
                        Document Type
                      </p>
                      <p className="text-sm text-gray-600 dark:text-gray-400">
                        {selectedEvent.extendedProps.document}
                      </p>
                    </div>
                  </div>
                )}

                {selectedEvent.extendedProps?.description && (
                  <div className="flex items-start gap-3">
                    <AlertCircle className="w-5 h-5 text-gray-400 mt-0.5" />
                    <div>
                      <p className="text-sm font-medium text-gray-700 dark:text-gray-300">
                        Description
                      </p>
                      <p className="text-sm text-gray-600 dark:text-gray-400">
                        {selectedEvent.extendedProps.description}
                      </p>
                    </div>
                  </div>
                )}

                {selectedEvent.extendedProps?.attendees && (
                  <div className="flex items-start gap-3">
                    <User className="w-5 h-5 text-gray-400 mt-0.5" />
                    <div>
                      <p className="text-sm font-medium text-gray-700 dark:text-gray-300">
                        Expected Attendees
                      </p>
                      <p className="text-sm text-gray-600 dark:text-gray-400">
                        {selectedEvent.extendedProps.attendees} people
                      </p>
                    </div>
                  </div>
                )}
              </div>
            </div>

            <div className="sticky bottom-0 bg-gray-50 dark:bg-gray-900 border-t border-gray-200 dark:border-gray-700 px-6 py-4 flex justify-end gap-3">
              <button
                onClick={() => handleDeleteEvent(selectedEvent.id)}
                className="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700"
              >
                Delete Event
              </button>
              <button
                onClick={() => setShowEventModal(false)}
                className="px-4 py-2 bg-gray-200 text-gray-700 dark:bg-gray-700 dark:text-gray-300 rounded-lg hover:bg-gray-300 dark:hover:bg-gray-600"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Add Event Modal */}
      {showAddModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white dark:bg-gray-800 rounded-lg max-w-2xl w-full max-h-[90vh] overflow-y-auto">
            <div className="sticky top-0 bg-white dark:bg-gray-800 border-b border-gray-200 dark:border-gray-700 px-6 py-4 flex items-center justify-between">
              <h2 className="text-2xl font-bold text-gray-900 dark:text-white">
                Add New Event
              </h2>
              <button
                onClick={() => setShowAddModal(false)}
                className="text-gray-400 hover:text-gray-600 dark:hover:text-gray-300"
              >
                <X className="w-6 h-6" />
              </button>
            </div>

            <div className="px-6 py-4 space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Event Title
                </label>
                <input
                  type="text"
                  value={newEvent.title}
                  onChange={(e) =>
                    setNewEvent({ ...newEvent, title: e.target.value })
                  }
                  className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="Enter event title"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Event Type
                </label>
                <select
                  value={newEvent.type}
                  onChange={(e) =>
                    setNewEvent({ ...newEvent, type: e.target.value })
                  }
                  className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                  <option value="pickup">Document Pickup</option>
                  <option value="meeting">Meeting</option>
                  <option value="event">Barangay Event</option>
                  <option value="assembly">Assembly</option>
                </select>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    Start Date & Time
                  </label>
                  <input
                    type="datetime-local"
                    value={newEvent.start}
                    onChange={(e) =>
                      setNewEvent({ ...newEvent, start: e.target.value })
                    }
                    className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    End Date & Time
                  </label>
                  <input
                    type="datetime-local"
                    value={newEvent.end}
                    onChange={(e) =>
                      setNewEvent({ ...newEvent, end: e.target.value })
                    }
                    className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Location
                </label>
                <input
                  type="text"
                  value={newEvent.location}
                  onChange={(e) =>
                    setNewEvent({ ...newEvent, location: e.target.value })
                  }
                  className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="Enter location"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Description
                </label>
                <textarea
                  value={newEvent.description}
                  onChange={(e) =>
                    setNewEvent({ ...newEvent, description: e.target.value })
                  }
                  rows={3}
                  className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="Enter description (optional)"
                />
              </div>
            </div>

            <div className="sticky bottom-0 bg-gray-50 dark:bg-gray-900 border-t border-gray-200 dark:border-gray-700 px-6 py-4 flex justify-end gap-3">
              <button
                onClick={() => setShowAddModal(false)}
                className="px-4 py-2 bg-gray-200 text-gray-700 dark:bg-gray-700 dark:text-gray-300 rounded-lg hover:bg-gray-300 dark:hover:bg-gray-600"
              >
                Cancel
              </button>
              <button
                onClick={handleAddEvent}
                disabled={!newEvent.title || !newEvent.start || !newEvent.end}
                className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                Add Event
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default AdminCalendar;
