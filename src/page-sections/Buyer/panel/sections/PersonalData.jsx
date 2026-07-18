import { useEffect } from 'react';
import { useAppDispatch, useAppSelector } from '@/store/hooks';
import { fetchUserProfile, updateUserProfile, updateUserAddress } from '@/store/user/operations';
import { selectUserProfile, selectUserAddress, selectUserIsLoading } from '@/store/user/selectors';
import BuyerForm from '@/page-sections/Buyer/buyer-form/BuyerForm.jsx';
import { useLanguage } from '@/context/LanguageContext';

export default function UserProfileFormik() {
  const { t } = useLanguage();
  const dispatch = useAppDispatch();
  const profile = useAppSelector(selectUserProfile);
  const address = useAppSelector(selectUserAddress);
  const isLoading = useAppSelector(selectUserIsLoading);

  useEffect(() => {
    dispatch(fetchUserProfile());
  }, [dispatch]);

  const handleUpdateProfile = (values) => {
    dispatch(updateUserProfile(values));
  };

  const handleUpdateAddress = (values) => {
    dispatch(updateUserAddress(values));
  };

  if (!profile && isLoading) {
    return <div className="text-center p-5 text-blue-900">Loading profile...</div>;
  }

  const userData = profile || {
    name: '',
    birthday: '',
    phoneNumber: '',
    email: '',
  };

  const addressData = address || {
    country: '',
    city: '',
    street: '',
  };

  return (
    <>
      <BuyerForm 
        title={t('userData')}
        initialData={userData} 
        onSubmit={handleUpdateProfile}
        isLoading={isLoading}
      />
      <BuyerForm 
        title={t('addressData')}
        initialData={addressData} 
        onSubmit={handleUpdateAddress}
        isLoading={isLoading}
      />
    </>
  );
}
