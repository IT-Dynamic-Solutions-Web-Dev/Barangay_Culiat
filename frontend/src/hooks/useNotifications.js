import { useEffect, useCallback } from 'react';
import notificationService, {
  notificationTypes,
  showNotification,
  showSuccess,
  showError,
  showInfo,
  showLoading,
  dismissToast,
  showPromise,
  showWithAction,
} from '../services/notificationService.jsx';

/**
 * Custom hook for managing notifications
 * @returns {Object} Notification methods and utilities
 */
export const useNotifications = () => {
  // Subscribe to notification events
  useEffect(() => {
    const unsubscribe = notificationService.subscribe((notification) => {
      // Handle notification event (e.g., update state, trigger actions)
      console.log('New notification:', notification);
    });

    return unsubscribe;
  }, []);

  // Notify new registration
  const notifyNewRegistration = useCallback((userName) => {
    return showNotification(
      notificationTypes.NEW_REGISTRATION,
      `New user registration pending approval`,
      { userName }
    );
  }, []);

  // Notify new document request
  const notifyNewDocumentRequest = useCallback((documentType, userName) => {
    return showNotification(
      notificationTypes.NEW_DOCUMENT_REQUEST,
      `${userName} requested a ${documentType}`,
      { documentType, userName }
    );
  }, []);

  // Notify new report
  const notifyNewReport = useCallback((category, priority) => {
    return showNotification(
      notificationTypes.NEW_REPORT,
      `New ${category.toLowerCase()} report submitted`,
      { category, priority }
    );
  }, []);

  // Notify document completed
  const notifyDocumentCompleted = useCallback((documentType) => {
    return showNotification(
      notificationTypes.DOCUMENT_COMPLETED,
      `${documentType} has been completed and is ready for pickup`
    );
  }, []);

  // Notify document rejected
  const notifyDocumentRejected = useCallback((documentType, reason) => {
    return showNotification(
      notificationTypes.DOCUMENT_REJECTED,
      `${documentType} request has been rejected: ${reason}`
    );
  }, []);

  // Notify report resolved
  const notifyReportResolved = useCallback((reportTitle) => {
    return showNotification(
      notificationTypes.REPORT_RESOLVED,
      `Report "${reportTitle}" has been resolved`
    );
  }, []);

  // Notify announcement published
  const notifyAnnouncementPublished = useCallback((title) => {
    return showNotification(
      notificationTypes.ANNOUNCEMENT_PUBLISHED,
      `New announcement: ${title}`
    );
  }, []);

  // Notify system update
  const notifySystemUpdate = useCallback((message) => {
    return showNotification(
      notificationTypes.SYSTEM_UPDATE,
      message
    );
  }, []);

  // Poll for new notifications (simulated - replace with WebSocket in production)
  const startPolling = useCallback((interval = 30000) => {
    const pollInterval = setInterval(async () => {
      try {
        // TODO: Replace with actual API call
        // const response = await fetch('/api/notifications/recent');
        // const data = await response.json();
        // Process new notifications
        console.log('Polling for new notifications...');
      } catch (error) {
        console.error('Error polling notifications:', error);
      }
    }, interval);

    return () => clearInterval(pollInterval);
  }, []);

  return {
    // Notification types
    notificationTypes,
    
    // Generic methods
    showNotification,
    showSuccess,
    showError,
    showInfo,
    showLoading,
    dismissToast,
    showPromise,
    showWithAction,
    
    // Specific notification methods
    notifyNewRegistration,
    notifyNewDocumentRequest,
    notifyNewReport,
    notifyDocumentCompleted,
    notifyDocumentRejected,
    notifyReportResolved,
    notifyAnnouncementPublished,
    notifySystemUpdate,
    
    // Polling
    startPolling,
    
    // Get notifications history
    getNotifications: () => notificationService.getNotifications(),
    clearNotifications: () => notificationService.clearNotifications(),
  };
};

export default useNotifications;
