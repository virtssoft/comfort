
import React, { useState } from 'react';
import { Heart, Lock, CheckCircle, CreditCard, Phone, Smartphone, AlertTriangle } from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';
import { api } from '../services/api';

const Donate: React.FC = () => {
  const { t } = useLanguage();
  
  // Form State
  const [amount, setAmount] = useState<number | null>(50);
  const [customAmount, setCustomAmount] = useState('');
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [method, setMethod] = useState('Carte');
  const [message, setMessage] = useState('');

  // Status State
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState('');

  const handleCustomChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setCustomAmount(e.target.value);
    setAmount(null);
  };

  const getFinalAmount = () => {
      return amount ? amount.toString() : customAmount;
  };

  const handleSubmit = async (e: React.FormEvent) => {
      e.preventDefault();
      setError('');
      setLoading(true);

      const finalAmount = getFinalAmount();

      if (!finalAmount || parseFloat(finalAmount) <= 0) {
          setError("Veuillez entrer un montant valide.");
          setLoading(false);
          return;
      }
      if (!name || !email) {
          setError("Veuillez remplir tous les champs obligatoires.");
          setLoading(false);
          return;
      }

      const payload = {
          donateur_nom: name,
          email: email,
          montant: finalAmount,
          methode: method,
          message: message,
          status: 'en_attente'
      };

      try {
          // Envoi à l'API
          const result = await api.sendDonation(payload);
          
          if (result.success) {
              setSuccess(true);
          } else {
              setError(result.error || "Une erreur est survenue lors de l'enregistrement du don.");
          }
      } catch (err) {
          setError("Erreur de connexion au serveur.");
      } finally {
          setLoading(false);
      }
  };

  const renderPaymentInstructions = () => {
      let icon = <AlertTriangle className="text-orange-500 mb-4 mx-auto" size={48} />;
      let title = "Méthode Indisponible";
      let content = <p className="text-gray-600">Le paiement par {method} n'est pas encore disponible automatiquement. Veuillez réessayer plus tard ou choisir Airtel Money.</p>;

      if (method === 'Airtel Money') {
          icon = <Phone className="text-red-600 mb-4 mx-auto" size={48} />;
          title = "Finaliser votre don via Airtel Money";
          content = (
              <div className="bg-red-50 border border-red-100 p-6 rounded-lg text-left">
                  <p className="font-bold text-gray-800 mb-2">Instructions :</p>
                  <ol className="list-decimal list-inside space-y-2 text-gray-700 text-sm mb-4">
                      <li>Ouvrez votre menu Airtel Money.</li>
                      <li>Choisissez l'option "Envoi Argent".</li>
                      <li>Entrez le numéro : <span className="font-bold text-xl text-red-600 select-all">+243 994 280 037</span></li>
                      <li>Montant : <span className="font-bold">{getFinalAmount()}$</span></li>
                      <li>Confirmez la transaction avec votre code PIN.</li>
                  </ol>
                  <p className="text-xs text-gray-500 italic">
                      Une fois le transfert effectué, notre administrateur validera votre don et vous recevrez un email de confirmation.
                  </p>
              </div>
          );
      } else if (method === 'M-Pesa') {
           icon = <Smartphone className="text-green-600 mb-4 mx-auto" size={48} />;
           title = "M-Pesa (Indisponible)";
           content = <p className="text-gray-600">Le numéro M-Pesa pour les dons est temporairement indisponible. Veuillez utiliser Airtel Money.</p>;
      } else if (method === 'Orange Money') {
           icon = <Smartphone className="text-orange-600 mb-4 mx-auto" size={48} />;
           title = "Orange Money (Indisponible)";
           content = <p className="text-gray-600">Le numéro Orange Money pour les dons est temporairement indisponible. Veuillez utiliser Airtel Money.</p>;
      } else if (method === 'Carte') {
           icon = <CreditCard className="text-blue-600 mb-4 mx-auto" size={48} />;
           title = "Virement Bancaire / Carte";
           content = <p className="text-gray-600">Le paiement par carte en ligne est en cours de maintenance. Veuillez effectuer un transfert mobile si possible.</p>;
      }

      return (
          <div className="text-center py-8 animate-in fade-in zoom-in duration-300">
               <div className="mb-6 flex justify-center">
                   <div className="bg-green-100 p-3 rounded-full">
                       <CheckCircle className="text-green-600" size={40} />
                   </div>
               </div>
               <h2 className="text-2xl font-bold text-gray-800 mb-2">Merci, {name} !</h2>
               <p className="text-gray-500 mb-8">Votre promesse de don a été enregistrée.</p>
               
               <div className="max-w-md mx-auto bg-white p-6 rounded-xl shadow-lg border border-gray-100">
                    {icon}
                    <h3 className="text-xl font-bold mb-4">{title}</h3>
                    {content}
               </div>

               <button 
                onClick={() => { setSuccess(false); setName(''); setEmail(''); setMessage(''); }} 
                className="mt-8 text-comfort-blue font-bold hover:underline"
               >
                   Faire un autre don
               </button>
          </div>
      );
  };

  return (
    <div className="py-16 bg-gray-50 min-h-screen">
      <div className="container mx-auto px-4 max-w-4xl">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-serif font-bold text-comfort-blue mb-4">{t('donate.title')}</h1>
          <p className="text-xl text-gray-600">{t('donate.subtitle')}</p>
        </div>

        {success ? renderPaymentInstructions() : (
        <div className="grid md:grid-cols-3 gap-8">
          {/* Donation Form */}
          <div className="md:col-span-2 bg-white p-8 rounded-lg shadow-md border border-gray-100">
            <h2 className="text-xl font-bold mb-6 flex items-center">
              <Heart className="text-red-500 mr-2" fill="currentColor" size={20} />
              {t('donate.choose_amount')}
            </h2>
            
            {/* Amount Selection */}
            <div className="grid grid-cols-3 gap-4 mb-6">
              {[10, 25, 50, 100, 250, 500].map((val) => (
                <button
                  key={val}
                  type="button"
                  onClick={() => { setAmount(val); setCustomAmount(''); }}
                  className={`py-3 rounded border font-semibold transition-all ${
                    amount === val 
                      ? 'bg-comfort-blue text-white border-comfort-blue' 
                      : 'bg-white text-gray-600 border-gray-200 hover:border-comfort-blue'
                  }`}
                >
                  ${val}
                </button>
              ))}
            </div>

            <div className="mb-8">
              <label className="block text-sm font-medium text-gray-700 mb-2">{t('donate.other_amount')}</label>
              <div className="relative">
                <span className="absolute left-4 top-3 text-gray-500">$</span>
                <input 
                  type="number" 
                  value={customAmount}
                  onChange={handleCustomChange}
                  className="w-full pl-8 pr-4 py-3 border border-gray-300 rounded focus:ring-2 focus:ring-comfort-blue focus:border-transparent outline-none"
                  placeholder="0.00"
                />
              </div>
            </div>

            <form onSubmit={handleSubmit}>
                <h2 className="text-xl font-bold mb-6">{t('donate.your_info')}</h2>
                
                {error && <div className="bg-red-50 text-red-600 p-3 rounded border border-red-200 mb-4 text-sm">{error}</div>}

                <div className="mb-4">
                    <label className="block text-sm font-medium text-gray-700 mb-1">Nom Complet *</label>
                    <input 
                        type="text" 
                        required
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        placeholder="Ex: Jean Dupont" 
                        className="w-full border border-gray-300 p-3 rounded focus:ring-comfort-blue focus:border-comfort-blue outline-none" 
                    />
                </div>
                
                <div className="mb-4">
                    <label className="block text-sm font-medium text-gray-700 mb-1">Adresse Email *</label>
                    <input 
                        type="email" 
                        required
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        placeholder="Ex: jean@exemple.com" 
                        className="w-full border border-gray-300 p-3 rounded focus:ring-comfort-blue focus:border-comfort-blue outline-none" 
                    />
                </div>

                <div className="mb-6">
                    <label className="block text-sm font-medium text-gray-700 mb-1">Message (Optionnel)</label>
                    <textarea 
                        value={message}
                        onChange={(e) => setMessage(e.target.value)}
                        placeholder="Un petit mot de soutien..." 
                        rows={3}
                        className="w-full border border-gray-300 p-3 rounded focus:ring-comfort-blue focus:border-comfort-blue outline-none resize-none" 
                    />
                </div>

                <div className="mb-6">
                    <label className="block text-sm font-medium text-gray-700 mb-1">Méthode de paiement</label>
                    <div className="relative">
                        <select 
                            value={method}
                            onChange={(e) => setMethod(e.target.value)}
                            className="w-full border border-gray-300 p-3 rounded focus:ring-comfort-blue focus:border-comfort-blue outline-none appearance-none bg-white"
                        >
                            <option value="Carte">Carte Bancaire / Visa / Mastercard</option>
                            <option value="Airtel Money">Airtel Money</option>
                            <option value="M-Pesa">M-Pesa (Vodacom)</option>
                            <option value="Orange Money">Orange Money</option>
                        </select>
                        <div className="absolute inset-y-0 right-0 flex items-center px-2 pointer-events-none">
                            <svg className="w-4 h-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7"></path></svg>
                        </div>
                    </div>
                </div>

                <button 
                    type="submit" 
                    disabled={loading}
                    className="w-full bg-comfort-blue text-white text-lg font-bold py-4 rounded hover:bg-blue-900 transition-colors shadow-lg disabled:opacity-70 disabled:cursor-not-allowed flex items-center justify-center"
                >
                    {loading ? (
                        <span>Traitement...</span>
                    ) : (
                        <span>{t('donate.button')} ${getFinalAmount() || '0'}</span>
                    )}
                </button>
                
                <p className="text-xs text-gray-400 mt-4 flex items-center justify-center">
                    <Lock size={12} className="mr-1" /> {t('donate.secure')}
                </p>
            </form>
          </div>

          {/* Sidebar Info */}
          <div className="md:col-span-1">
             <div className="bg-blue-900 text-white p-6 rounded-lg shadow-lg mb-6 sticky top-24">
               <h3 className="font-bold text-lg mb-4">{t('donate.why_give')}</h3>
               <ul className="space-y-4 text-blue-100 text-sm">
                 <li className="flex items-start">
                   <span className="mr-2 text-yellow-400 font-bold">•</span> $25 fournit des kits scolaires pour 5 enfants déplacés.
                 </li>
                 <li className="flex items-start">
                   <span className="mr-2 text-yellow-400 font-bold">•</span> $100 finance des soins médicaux d'urgence pour une famille.
                 </li>
                 <li className="flex items-start">
                   <span className="mr-2 text-yellow-400 font-bold">•</span> $500 contribue à la construction d'un puits communautaire.
                 </li>
               </ul>
               <div className="mt-6 pt-6 border-t border-blue-800">
                   <h3 className="font-bold text-white mb-2">{t('donate.help')}</h3>
                   <p className="text-sm text-blue-200 mb-2">Une question sur les méthodes de paiement ?</p>
                   <a href="mailto:donations@comfort-asbl.org" className="text-yellow-400 text-sm font-semibold hover:underline block mb-1">donations@comfort-asbl.org</a>
                   <a href="tel:+243994280037" className="text-yellow-400 text-sm font-semibold hover:underline block">+243 994 280 037</a>
               </div>
             </div>
          </div>
        </div>
        )}
      </div>
    </div>
  );
};

export default Donate;
