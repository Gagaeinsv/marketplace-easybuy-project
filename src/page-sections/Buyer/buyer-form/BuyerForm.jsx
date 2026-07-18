'use client';

import { useState } from 'react';
import { Formik, Form, Field } from 'formik';
import EditIcon from '@/components/icons/mobile/EditIcon.jsx';
import { useLanguage } from '@/context/LanguageContext';

export default function BuyerForm({ title, initialData = {}, onSubmit, isLoading }) {
  const { t } = useLanguage();
  const normalizeData = (data) => ({
    ...(data || {}),
    birthday: data?.birthday ? new Date(data.birthday).toISOString().split('T')[0] : '',
  });

  const [editMode, setEditMode] = useState(false);

  const handleSave = (values) => {
    if (onSubmit) {
      onSubmit(values);
    }
    setEditMode(false);
  };

  const handleCancel = (resetForm) => {
    resetForm();
    setEditMode(false);
  };

  return (
    <div className="mb-10">
      <h3 className="text-lg font-bold text-blue-900 mb-3">{title}</h3>
      
      <div className="w-full relative mb-6 p-5 border rounded-2xl shadow-sm bg-white">
        {/* Edit Button inside the card (top right) */}
        {!editMode && (
          <button
            onClick={() => setEditMode(true)}
            className="absolute top-4 right-4 border p-1 border-amber-500 rounded text-amber-500 hover:bg-amber-50 transition"
          >
            <EditIcon />
          </button>
        )}
        <Formik
          initialValues={normalizeData(initialData || {})}
          enableReinitialize
          onSubmit={handleSave}
        >
          {({ values, resetForm }) => {
            const keys = Object.keys(initialData || {});
            const gridColsClass = keys.length === 4 ? 'md:grid-cols-4' : (keys.length === 3 ? 'md:grid-cols-3' : 'md:grid-cols-2');

            return (
              <Form>
                <div className={editMode ? `grid grid-cols-1 ${gridColsClass} gap-4` : 'space-y-4 pr-12'}>
                  {keys.map((key) => (
                    <div key={key} className={editMode ? '' : 'flex flex-wrap gap-2 text-[16px] md:text-[20px]'}>
                      <label className={`block font-bold text-blue-900 capitalize ${editMode ? 'mb-2 text-sm md:text-base' : ''}`}>
                        {key === 'birthday' ? t('dateOfBirth') + ':' : 
                         key === 'phoneNumber' ? t('profilePhone') + ':' : 
                         key === 'name' ? t('profileName') + ':' :
                         key === 'email' ? t('profileEmail') + ':' :
                         key === 'country' ? t('country') + ':' :
                         key === 'city' ? t('city') + ':' :
                         key === 'street' ? t('address') + ':' : key + ':'}
                      </label>
                      {editMode ? (
                        <Field
                          name={key}
                          type={key === 'birthday' ? 'date' : 'text'}
                          className="w-full border border-blue-900/30 p-2 md:p-3 rounded-lg focus:outline-none focus:border-blue-900 text-blue-900"
                        />
                      ) : (
                        <p className="text-blue-900">{values[key]}</p>
                      )}
                    </div>
                  ))}
                </div>

                {editMode && (
                  <div className="flex justify-center items-center gap-4 mt-8">
                    <button
                      type="button"
                      disabled={isLoading}
                      onClick={() => handleCancel(resetForm)}
                      className="w-[120px] bg-white text-blue-900 py-2 rounded-lg border border-blue-900 font-bold hover:bg-blue-50 transition disabled:opacity-70"
                    >
                      {t('cancelBtn')}
                    </button>
                    <button 
                      type="submit" 
                      disabled={isLoading} 
                      className={`w-[120px] gradient-button text-white font-bold py-2 rounded-lg shadow-md hover:opacity-90 transition ${isLoading ? 'opacity-70 cursor-not-allowed' : ''}`}
                    >
                      {isLoading ? t('loadingText') : t('saveBtn')}
                    </button>
                  </div>
                )}
              </Form>
            );
          }}
        </Formik>
      </div>
    </div>
  );
}
