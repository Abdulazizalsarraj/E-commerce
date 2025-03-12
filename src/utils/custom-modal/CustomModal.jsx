import React, { forwardRef, useImperativeHandle, useState } from 'react';
import { motion } from 'framer-motion';
import PropTypes from 'prop-types';
import { FaTimes } from 'react-icons/fa';

const CustomModal = forwardRef(({
  children,
  title,
  buttons,
  onClose,
  width = 'max-w-md',
  overlayClass = 'bg-black/50',
  contentClass = '',
  closeButton = true,
  animation = { initial: { opacity: 0, scale: 0.9 }, animate: { opacity: 1, scale: 1 } }
}, ref) => {
  const [isOpen, setIsOpen] = useState(false);

  useImperativeHandle(ref, () => ({
    open: () => setIsOpen(true),
    close: () => setIsOpen(false)
  }));

  const handleClose = () => {
    setIsOpen(false);
    onClose?.();
  };

  return (
    <>
      {isOpen && (
        <div className={`fixed inset-0 z-50 flex items-center justify-center p-4 ${overlayClass}`}>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="fixed inset-0 bg-black/30"
            onClick={handleClose}
          />
          
          <motion.div
            initial={animation.initial}
            animate={animation.animate}
            transition={{ duration: 0.3 }}
            // className={`relative bg-white rounded-2xl shadow-xl w-full ${width} ${contentClass}`}
            className={`relative bg-slate-900 rounded-2xl shadow-xl w-full ${width} ${contentClass}`}
          >
            <div className="p-6">
              {closeButton && (
                <button
                  onClick={handleClose}
                  className="absolute top-4 right-4 text-gray-500 hover:text-gray-700 transition-colors"
                >
                  <FaTimes className="w-5 h-5" />
                </button>
              )}
              
              {title && (
                // <h2 className="text-2xl font-semibold text-gray-800 mb-6">
                <h2 className="text-2xl font-semibold text-gray-200 mb-6">
                  {title}
                </h2>
              )}
              
              <div className="space-y-4">
                {children}
              </div>

              {buttons && (
                <div className="mt-6 flex justify-end space-x-4">
                  {buttons}
                </div>
              )}
            </div>
          </motion.div>
        </div>
      )}
    </>
  );
});

CustomModal.propTypes = {
  title: PropTypes.string,
  children: PropTypes.node.isRequired,
  buttons: PropTypes.node,
  onClose: PropTypes.func,
  width: PropTypes.string,
  overlayClass: PropTypes.string,
  contentClass: PropTypes.string,
  closeButton: PropTypes.bool,
  animation: PropTypes.object
};

export default CustomModal;



/*
مزايا المودال المخصصة:
تحكم كامل عبر الـ ref - يمكن فتح/إغلاق المودال من أي مكون أب

تخصيص كامل:

تحديد عنوان مخصص أو إزالته

تحديد أزرار مخصصة أو عدم عرضها

تعديل العرض (width)

إضافة كلاسات CSS مخصصة للخلفية والمحتوى

التحكم في زر الإغلاق

تخصيص تأثيرات الحركة

تصميم حديث مع backdrop blur

دعم لأي نوع محتوى عبر خاصية children

التحقق من الأنواع باستخدام PropTypes

حركات سلسة مع Framer Motion

يمكنك استخدام نفس المودال لأي غرض آخر مثل:


<CustomModal
  ref={someRef}
  title="Confirmation"
  buttons={[
    <button onClick={handleConfirm}>Confirm</button>,
    <button onClick={handleCancel}>Cancel</button>
  ]}
>
  <p>Are you sure you want to perform this action?</p>
</CustomModal>

*/