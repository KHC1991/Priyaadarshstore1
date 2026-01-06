const handleSubmit = async (e) => {
  e.preventDefault();
  setIsSubmitting(true);
  setError(null);

  // આ લોજિકથી ADMIN અને 8140 પિન કામ કરશે
  if (formData.email.toUpperCase() === 'ADMIN' && formData.password === '8140') {
    onAuth({ id: 'ADMIN', name: 'Admin User', isLoggedIn: true });
    navigate('/dashboard');
  } else {
    // જો ઉપરનું કામ ન કરે તો ડેટાબેઝમાંથી પિન ચેક કરશે
    try {
      const pinRef = ref(db, 'pin');
      const snapshot = await get(pinRef);
      if (snapshot.exists() && formData.password === snapshot.val().toString()) {
        onAuth({ id: 'ADMIN', name: 'Admin User', isLoggedIn: true });
        navigate('/dashboard');
      } else {
        alert("Invalid Credentials! સાચો પિન (8140) નાખો.");
      }
    } catch (err) {
      alert("કનેક્શનમાં ભૂલ છે!");
    }
  }
  setIsSubmitting(false);
};
