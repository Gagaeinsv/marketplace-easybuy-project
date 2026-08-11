'use client';

import { useState } from 'react';
import { useLanguage } from '@/context/LanguageContext';
import toast from 'react-hot-toast';
import axios from 'axios';

export default function Setting() {
  const { t } = useLanguage();
  const [oldPassword, setOldPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  const [notifications, setNotifications] = useState({
    orderUpdates: true,
    promotions: false,
    securityAlerts: true,
  });

  const handleChangePassword = async (e) => {
    e.preventDefault();
    if (!oldPassword || !newPassword || !confirmPassword) {
      toast.error(t('fillAllFields') || 'Please fill in all password fields.');
      return;
    }
    if (newPassword !== confirmPassword) {
      toast.error(t('passwordsDoNotMatch') || 'Passwords do not match.');
      return;
    }

    setIsSubmitting(true);
    try {
      await axios.post('/v1/auth/password/change', {
        oldPassword,
        newPassword,
      });
      toast.success(t('passwordChangedSuccess') || 'Password changed successfully!');
      setOldPassword('');
      setNewPassword('');
      setConfirmPassword('');
    } catch (error) {
      toast.error(t('passwordChangeFailed') || 'Failed to change password.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="w-full max-w-2xl flex flex-col gap-8">
      {/* Password Change Block */}
      <div className="bg-white rounded-2xl p-6 border border-gray-100 shadow-sm">
        <h3 className="text-xl font-bold text-[#104c9a] mb-4">
          {t('changePasswordTitle') || 'Change Password'}
        </h3>

        <form onSubmit={handleChangePassword} className="flex flex-col gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              {t('oldPasswordLabel') || 'Current Password'}
            </label>
            <input
              type="password"
              value={oldPassword}
              onChange={(e) => setOldPassword(e.target.value)}
              className="w-full rounded-lg border border-gray-300 px-4 py-2.5 text-sm focus:border-[#104c9a] focus:outline-none transition-colors"
              placeholder="••••••••"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              {t('newPasswordLabel') || 'New Password'}
            </label>
            <input
              type="password"
              value={newPassword}
              onChange={(e) => setNewPassword(e.target.value)}
              className="w-full rounded-lg border border-gray-300 px-4 py-2.5 text-sm focus:border-[#104c9a] focus:outline-none transition-colors"
              placeholder="••••••••"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              {t('confirmNewPasswordLabel') || 'Confirm New Password'}
            </label>
            <input
              type="password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              className="w-full rounded-lg border border-gray-300 px-4 py-2.5 text-sm focus:border-[#104c9a] focus:outline-none transition-colors"
              placeholder="••••••••"
            />
          </div>

          <button
            type="submit"
            disabled={isSubmitting}
            className="mt-2 w-full md:w-auto self-start px-6 py-2.5 bg-[#104c9a] text-white font-bold rounded-xl hover:brightness-110 active:scale-[0.98] transition-all"
          >
            {isSubmitting ? t('saving') || 'Saving...' : t('updatePasswordBtn') || 'Update Password'}
          </button>
        </form>
      </div>

      {/* Notifications Preferences Block */}
      <div className="bg-white rounded-2xl p-6 border border-gray-100 shadow-sm">
        <h3 className="text-xl font-bold text-[#104c9a] mb-4">
          {t('notificationSettings') || 'Notification Preferences'}
        </h3>

        <div className="flex flex-col gap-4">
          <label className="flex items-center justify-between cursor-pointer py-2 border-b border-gray-100">
            <div>
              <p className="font-semibold text-gray-800 text-sm">{t('orderStatusNotifications') || 'Order Status Updates'}</p>
              <p className="text-xs text-gray-500">{t('orderStatusDesc') || 'Receive email notifications when your order status changes'}</p>
            </div>
            <input
              type="checkbox"
              checked={notifications.orderUpdates}
              onChange={(e) => setNotifications({ ...notifications, orderUpdates: e.target.checked })}
              className="w-5 h-5 accent-[#104c9a] rounded"
            />
          </label>

          <label className="flex items-center justify-between cursor-pointer py-2 border-b border-gray-100">
            <div>
              <p className="font-semibold text-gray-800 text-sm">{t('promoNotifications') || 'Promotions & Discounts'}</p>
              <p className="text-xs text-gray-500">{t('promoDesc') || 'Get special offers and discount codes'}</p>
            </div>
            <input
              type="checkbox"
              checked={notifications.promotions}
              onChange={(e) => setNotifications({ ...notifications, promotions: e.target.checked })}
              className="w-5 h-5 accent-[#104c9a] rounded"
            />
          </label>

          <label className="flex items-center justify-between cursor-pointer py-2">
            <div>
              <p className="font-semibold text-gray-800 text-sm">{t('securityNotifications') || 'Security Alerts'}</p>
              <p className="text-xs text-gray-500">{t('securityDesc') || 'Important security notifications regarding your account'}</p>
            </div>
            <input
              type="checkbox"
              checked={notifications.securityAlerts}
              onChange={(e) => setNotifications({ ...notifications, securityAlerts: e.target.checked })}
              className="w-5 h-5 accent-[#104c9a] rounded"
            />
          </label>
        </div>
      </div>
    </div>
  );
}
