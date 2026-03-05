"use client"
import { useEffect, useState } from "react";

export default function FormAlert(){
    const [notificationAlert, setNotificationAlert] = useState(false);
    
  const handleEnableNotifications = async () => {
    try {
      const permission = await Notification.requestPermission();
      if (permission === "granted") {
        setNotificationAlert(true);
        new Notification("CRISPR-GATE: ALERTA MÉDICA", {
          body: "Sujeto sin esquema de vacunación detectado en Aduana.",
          icon?: "/alert-icon.png"
        });
      }
    } catch (error) {
      console.error("Error al solicitar permisos:", error);
    }
    };

  return (
    <button
      onClick={handleEnableNotifications}
      disabled={notificationAlert}
      style={{
        padding: '10px 20px',
        backgroundColor: notificationAlert ? '#4CAF50' : '#2196F3',
        color: 'white',
        border: 'none',
        borderRadius: '5px',
        cursor: notificationAlert ? 'default' : 'pointer',
        fontWeight: 'bold',
        transition: 'background-color 0.3s'
      }}
    >
      {notificationAlert ? 'Notificaciones Activas' : 'Habilitar Alertas'}
    </button>
}