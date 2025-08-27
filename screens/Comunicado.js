import React, { useEffect } from 'react';
import Layout from "../components/Layout";
import ComList from "../components/ComList";
import { useRoute } from '@react-navigation/native';
import * as Notifications from 'expo-notifications';

const Comunicado = () => {
  const route = useRoute();
  const { title, id, token, notificationData } = route.params || {};
  const valumno = title;
  const vcodalu = id;

  const { notificationId, userId } = notificationData || {};

  console.log(id + title + 'comunicado tok:' + token);

  useEffect(() => {
    const dismissNotification = async () => {
      try {
        if (userId === id && notificationId) {
          await Notifications.dismissNotificationAsync(notificationId);
          console.log('Notification dismissed successfully');
        }
      } catch (error) {
        console.error('Error dismissing notification:', error);
      }
    };
    dismissNotification();

    return () => {
      dismissNotification();
    };
  }, [userId, id, notificationId]);

  return (
    <Layout>
      <ComList id={vcodalu} title={valumno} token={token} />
    </Layout>
  );
};

export default Comunicado;
