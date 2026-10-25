/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { UserSettings, DailyRecord } from '../types';
import {
  SALT_QUESTIONS,
  evaluateSaltScore,
  BP_MEASUREMENT_RULES,
} from '../utils/saltCheckQuestions';
import {
  saveStoredSettings,
  saveStoredSaltCheck,
  exportBackupJSON,
  exportRecordsCSV,
} from '../utils/storage';
import { generateSampleRecords } from '../utils/mockData';
import {
  BookOpen,
  Settings,
  Utensils,
  Download,
  Upload,
  RefreshCw,
  Trash2,
  CheckCircle,
  Building,
  User,
  HeartHandshake,
  FileSpreadsheet,
  Scale,
} from 'lucide-react';

interface GuideAndSettingsViewProps {
  settings: UserSettings;
  onUpdateSettings: (newSettings: UserSettings) => void;
  records: DailyRecord[];
  onImportRecords: (newRecords: DailyRecord[]) => void;
  saltAnswers: Record<number, number>;
  onUpdateSaltAnswers: (answers: Record<number, number>) => void;
}

export const GuideAndSettingsView: React.FC<GuideAndSettingsViewProps> = ({
  settings,
  onUpdateSettings,
  records,
  onImportRecords,
  saltAnswers,
  onUpdateSaltAnswers,
}) => {
  const [activeTab, setActiveTab] = useState<'rules' | 'salt' | 'settings'>('rules');
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  // Settings form
  const [formSettings, setFormSettings] = useState<UserSettings>(settings);

  // File import ref
  const fileInputRef = React.useRef<HTMLInputElement | null>(null);

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(null), 3000);
  };

  // Calculate current salt score
  const totalSaltScore = Object.values(saltAnswers).reduce((acc, pts) => acc + pts, 0);
  const answeredCount = Object.keys(saltAnswers).length;
  const evaluation = evaluateSaltScore(totalSaltScore);

  const handleSelectOption = (questionId: number, points: number) => {
    const updated = { ...saltAnswers, [questionId]: points };
    onUpdateSaltAnswers(updated);
    saveStoredSaltCheck(updated);
  };

  const handleSaveSettings = (e: React.FormEvent) => {
    e.preventDefault();
    onUpdateSettings(formSettings);
    saveStoredSettings(formSettings);
    showToast('⚙️ Impostazioni salvate con successo');
  };

  const handleLoadSampleData = () => {
    const samples = generateSampleRecords();
    onImportRecords(samples);
    showToast('📊 Caricati 14 giorni di dati dimostrativi');
  };

  const handleClearAllData = () => {
    if (window.confirm('Sei sicuro di voler cancellare tutte le misurazioni della pressione?\n(Questa operazione non può essere annullata)')) {
      onImportRecords([]);
      showToast('🗑️ Tutte le misurazioni sono state cancellate');
    }
  };

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = (event) => {
      try {
        const text = event.target?.result as string;
        const parsed = JSON.parse(text);
        if (parsed.records && Array.isArray(parsed.records)) {
          onImportRecords(parsed.records);
          if (parsed.settings) {
            onUpdateSettings(parsed.settings);
            setFormSettings(parsed.settings);
          }
          showToast('✅ Dati ripristinati con successo dal backup');
        } else if (Array.isArray(parsed)) {
          onImportRecords(parsed);
          showToast('✅ Misurazioni importate con successo');
        } else {
          alert('Formato del file di backup non valido');
        }
      } catch {
        alert('Errore durante la lettura del file di backup');
      }
    };
    reader.readAsText(file);
    e.target.value = '';
  };

  return (
    <div className="pb-24 max-w-3xl mx-auto px-3 sm:px-4 pt-3">
      {/* Toast Notification */}
      {toastMessage && (
        <div className="fixed top-4 left-1/2 -translate-x-1/2 z-50 bg-slate-900 text-white font-bold py-3 px-6 rounded-2xl shadow-2xl flex items-center gap-2 border-2 border-emerald-400 animate-bounce">
          <CheckCircle className="w-5 h-5 text-emerald-400" />
          <span className="text-sm sm:text-base">{toastMessage}</span>
        </div>
      )}

      {/* Sub-tab Navigation */}
      <div className="grid grid-cols-3 gap-1.5 p-1 bg-slate-200/80 rounded-2xl mb-4">
        <button
          type="button"
          onClick={() => setActiveTab('rules')}
          className={`py-2.5 px-1 sm:px-2 rounded-xl text-xs sm:text-sm font-bold flex flex-col sm:flex-row items-center justify-center gap-1 transition-all cursor-pointer ${
            activeTab === 'rules'
              ? 'bg-white text-blue-900 shadow-sm border border-slate-300'
              : 'text-slate-600 hover:text-slate-900'
          }`}
        >
          <BookOpen className="w-4 h-4 text-blue-600 shrink-0" />
          <span className="whitespace-nowrap">Guida ESC/SIIA</span>
        </button>

        <button
          type="button"
          onClick={() => setActiveTab('salt')}
          className={`py-2.5 px-1 sm:px-2 rounded-xl text-xs sm:text-sm font-bold flex flex-col sm:flex-row items-center justify-center gap-1 transition-all cursor-pointer ${
            activeTab === 'salt'
              ? 'bg-white text-blue-900 shadow-sm border border-slate-300'
              : 'text-slate-600 hover:text-slate-900'
          }`}
        >
          <Utensils className="w-4 h-4 text-amber-600 shrink-0" />
          <span className="whitespace-nowrap">Test del Sale</span>
        </button>

        <button
          type="button"
          onClick={() => setActiveTab('settings')}
          className={`py-2.5 px-1 sm:px-2 rounded-xl text-xs sm:text-sm font-bold flex flex-col sm:flex-row items-center justify-center gap-1 transition-all cursor-pointer ${
            activeTab === 'settings'
              ? 'bg-white text-blue-900 shadow-sm border border-slate-300'
              : 'text-slate-600 hover:text-slate-900'
          }`}
        >
          <Settings className="w-4 h-4 text-slate-700 shrink-0" />
          <span className="whitespace-nowrap">Impostazioni</span>
        </button>
      </div>

      {/* TAB 1: Dietary Sodium Screener (Western Diet AHA standard) */}
      {activeTab === 'salt' && (
        <div className="space-y-4">
          {/* Real-time Result Banner */}
          <div className="bg-white rounded-2xl p-4 shadow-sm border border-slate-200">
            <div className="flex flex-wrap items-center justify-between gap-y-1.5 gap-x-3 pb-2.5 border-b border-slate-100">
              <span className="text-xs sm:text-sm font-bold text-slate-700 whitespace-nowrap">
                Valutazione del Consumo di Sale (Linee Guida ESC/SIIA)
              </span>
              <span className="text-xs text-slate-600 font-medium bg-slate-100 px-2.5 py-0.5 rounded-full whitespace-nowrap">
                Risposte: <strong className="font-bold text-blue-600 font-mono">{answeredCount}</strong> / {SALT_QUESTIONS.length}
              </span>
            </div>

            <div className="mt-3 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
              <div className="shrink-0">
                <div className="text-xs text-slate-500 font-bold whitespace-nowrap">Punteggio Sodio</div>
                <div className="text-3xl font-black font-mono text-slate-900 flex items-baseline gap-1">
                  <span>{totalSaltScore}</span>
                  <span className="text-sm font-normal text-slate-400 whitespace-nowrap">pt / 36</span>
                </div>
              </div>

              <div className={`p-3 rounded-xl border ${evaluation.badgeColor} flex-1`}>
                <div className="text-sm sm:text-base font-extrabold flex items-center gap-1.5">
                  <span>{evaluation.title}</span>
                </div>
                <div className="text-xs mt-1 leading-relaxed">{evaluation.description}</div>
                <div className="text-xs mt-1 font-bold text-slate-900 bg-white/70 p-1.5 rounded">
                  Consiglio medico: {evaluation.advice}
                </div>
              </div>
            </div>
          </div>

          {/* 12 Questions List */}
          <div className="space-y-3">
            {SALT_QUESTIONS.map((q) => {
              const currentAnswer = saltAnswers[q.id];

              return (
                <div
                  key={q.id}
                  className="bg-white rounded-2xl p-3.5 sm:p-4 shadow-sm border border-slate-200"
                >
                  <div className="flex items-center justify-between mb-1">
                    <span className="text-[11px] font-bold text-blue-700 bg-blue-50 border border-blue-200 px-2 py-0.5 rounded-md">
                      {q.category}
                    </span>
                  </div>
                  <h4 className="text-sm sm:text-base font-extrabold text-slate-900 mb-2.5">
                    {q.question}
                  </h4>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                    {q.options.map((opt) => {
                      const isSelected = currentAnswer === opt.points;
                      return (
                        <button
                          key={opt.label}
                          type="button"
                          onClick={() => handleSelectOption(q.id, opt.points)}
                          className={`min-h-[48px] px-3 py-2 text-left rounded-xl text-xs sm:text-sm font-bold flex items-center justify-between border-2 transition-all cursor-pointer ${
                            isSelected
                              ? 'bg-blue-600 text-white border-blue-700 shadow-sm'
                              : 'bg-slate-50 text-slate-700 border-slate-200 hover:bg-slate-100'
                          }`}
                        >
                          <span className="pr-2">{opt.label}</span>
                          <span
                            className={`text-xs px-2 py-0.5 rounded-full shrink-0 ${
                              isSelected
                                ? 'bg-blue-800 text-blue-100'
                                : 'bg-slate-200 text-slate-600'
                            }`}
                          >
                            {opt.points} pt
                          </span>
                        </button>
                      );
                    })}
                  </div>
                </div>
              );
            })}
          </div>

          <div className="text-center p-3 text-xs text-slate-400">
            Fonte: Linee Guida della Società Europea di Cardiologia (ESC) e della Società Italiana dell’Ipertensione Arteriosa (SIIA)
          </div>
        </div>
      )}

      {/* TAB 2: Proper Measurement 7 AHA Rules & Categories */}
      {activeTab === 'rules' && (
        <div className="space-y-4">
          <div className="bg-white rounded-2xl p-4 shadow-sm border border-slate-200">
            <h3 className="text-base sm:text-lg font-black text-slate-900 flex items-center gap-2 mb-1">
              <HeartHandshake className="w-5 h-5 text-rose-600" />
              <span>Linee Guida ESC / SIIA: 7 Regole per una Misurazione Corretta</span>
            </h3>
            <p className="text-xs text-slate-500 leading-relaxed">
              Standardizzato dalle linee guida europee (ESC/ESH) e italiane (SIIA) per garantire al tuo medico o cardiologo valori domiciliari affidabili.
            </p>
          </div>

          <div className="space-y-2.5">
            {BP_MEASUREMENT_RULES.map((rule) => (
              <div
                key={rule.number}
                className="bg-white rounded-2xl p-3.5 sm:p-4 shadow-sm border border-slate-200 flex items-start gap-3.5"
              >
                <div className="w-8 h-8 rounded-xl bg-blue-600 text-white font-extrabold flex items-center justify-center shrink-0 text-base shadow-sm">
                  {rule.number}
                </div>
                <div>
                  <h4 className="text-sm sm:text-base font-extrabold text-slate-900">
                    {rule.title}
                  </h4>
                  <p className="text-xs sm:text-sm text-slate-600 mt-1 leading-relaxed">
                    {rule.desc}
                  </p>
                </div>
              </div>
            ))}
          </div>

          {/* AHA 2017/2024 Category Chart */}
          <div className="bg-blue-50 border-2 border-blue-200 rounded-2xl p-4">
            <h4 className="font-extrabold text-sm sm:text-base text-blue-950 mb-2">
              💡 Classificazione della Pressione Arteriosa negli Adulti (ESC/SIIA)
            </h4>
            <div className="space-y-2 text-xs sm:text-sm">
              <div className="bg-white p-2.5 rounded-xl border border-emerald-300 flex items-center justify-between">
                <div>
                  <span className="font-extrabold text-emerald-800">Pressione Ottimale / Normale:</span>
                  <span className="text-slate-600 ml-1.5">Sistolica &lt; 120 e Diastolica &lt; 80 mmHg</span>
                </div>
                <span className="px-2 py-0.5 rounded text-xs font-bold bg-emerald-100 text-emerald-800">
                  Ideal
                </span>
              </div>

              <div className="bg-white p-2.5 rounded-xl border border-amber-300 flex items-center justify-between">
                <div>
                  <span className="font-extrabold text-amber-800">Pressione Normale-Alta:</span>
                  <span className="text-slate-600 ml-1.5">Sistolica 120–129 e Diastolica &lt; 80 mmHg</span>
                </div>
                <span className="px-2 py-0.5 rounded text-xs font-bold bg-amber-100 text-amber-800">
                  Stile di vita
                </span>
              </div>

              <div className="bg-white p-2.5 rounded-xl border border-orange-300 flex items-center justify-between">
                <div>
                  <span className="font-extrabold text-orange-800">Ipertensione Grado 1:</span>
                  <span className="text-slate-600 ml-1.5">Sistolica 130–139 o Diastolica 80–89 mmHg</span>
                </div>
                <span className="px-2 py-0.5 rounded text-xs font-bold bg-orange-100 text-orange-800">
                  Grado 1
                </span>
              </div>

              <div className="bg-white p-2.5 rounded-xl border border-rose-300 flex items-center justify-between">
                <div>
                  <span className="font-extrabold text-rose-800">Ipertensione Grado 2:</span>
                  <span className="text-slate-600 ml-1.5">Sistolica ≥ 140 o Diastolica ≥ 90 mmHg</span>
                </div>
                <span className="px-2 py-0.5 rounded text-xs font-bold bg-rose-100 text-rose-800">
                  Grado 2
                </span>
              </div>
            </div>
            <div className="text-[11px] text-slate-500 mt-2">
              Nota: Il valore obiettivo domiciliare abituale per chi è in trattamento è &lt; 130 / 80 mmHg.
            </div>
          </div>
        </div>
      )}

      {/* TAB 3: Target BP Settings & Data Management */}
      {activeTab === 'settings' && (
        <div className="space-y-4">
          {/* Target BP Form */}
          <form
            onSubmit={handleSaveSettings}
            className="bg-white rounded-2xl p-4 shadow-sm border border-slate-200"
          >
            <h3 className="text-base sm:text-lg font-black text-slate-900 mb-1">
              Valori Obiettivo e Dati del Paziente
            </h3>
            <p className="text-xs text-slate-500 mb-4">
              Personalizza i valori target della pressione domiciliare concordati con il tuo medico curante o cardiologo.
            </p>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mb-4">
              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">
                  Target Sistolica / Massima (MAX) [mmHg]
                </label>
                <div className="flex items-center gap-2">
                  <input
                    type="number"
                    min="80"
                    max="220"
                    value={formSettings.targetSystolic}
                    onChange={(e) =>
                      setFormSettings((prev) => ({
                        ...prev,
                        targetSystolic: parseInt(e.target.value, 10) || 130,
                      }))
                    }
                    className="w-full px-3 py-2.5 text-lg font-mono font-bold bg-slate-50 border border-slate-300 rounded-xl focus:bg-white focus:ring-2 focus:ring-blue-600"
                  />
                  <span className="text-xs text-slate-500 font-semibold whitespace-nowrap">o inferiore</span>
                </div>
                <div className="text-[11px] text-slate-400 mt-1">Target standard domiciliare (ESC/SIIA): 130</div>
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">
                  Target Diastolica / Minima (MIN) [mmHg]
                </label>
                <div className="flex items-center gap-2">
                  <input
                    type="number"
                    min="40"
                    max="140"
                    value={formSettings.targetDiastolic}
                    onChange={(e) =>
                      setFormSettings((prev) => ({
                        ...prev,
                        targetDiastolic: parseInt(e.target.value, 10) || 80,
                      }))
                    }
                    className="w-full px-3 py-2.5 text-lg font-mono font-bold bg-slate-50 border border-slate-300 rounded-xl focus:bg-white focus:ring-2 focus:ring-blue-600"
                  />
                  <span className="text-xs text-slate-500 font-semibold whitespace-nowrap">o inferiore</span>
                </div>
                <div className="text-[11px] text-slate-400 mt-1">Target standard domiciliare (ESC/SIIA): 80</div>
              </div>
            </div>

            <div className="space-y-3 mb-4 pt-3 border-t border-slate-100">
              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1 flex items-center gap-1.5">
                  <Building className="w-4 h-4 text-slate-500" />
                  <span>Nome dello Studio Medico / Cardiologo</span>
                </label>
                <input
                  type="text"
                  value={formSettings.hospitalName}
                  onChange={(e) =>
                    setFormSettings((prev) => ({ ...prev, hospitalName: e.target.value }))
                  }
                  placeholder="Es.: Dott. Rossi - Ambulatorio di Cardiologia"
                  className="w-full px-3 py-2 text-sm bg-slate-50 border border-slate-300 rounded-xl focus:bg-white focus:ring-2 focus:ring-blue-600"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1 flex items-center gap-1.5">
                  <User className="w-4 h-4 text-slate-500" />
                  <span>Nome e Cognome del Paziente (Stampato sui report)</span>
                </label>
                <input
                  type="text"
                  value={formSettings.patientName || ''}
                  onChange={(e) =>
                    setFormSettings((prev) => ({ ...prev, patientName: e.target.value }))
                  }
                  placeholder="Es.: Mario Bianchi"
                  className="w-full px-3 py-2 text-sm bg-slate-50 border border-slate-300 rounded-xl focus:bg-white focus:ring-2 focus:ring-blue-600"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1 flex items-center gap-1.5">
                  <Scale className="w-4 h-4 text-slate-500" />
                  <span>Unità di Misura del Peso</span>
                </label>
                <div className="inline-flex rounded-xl bg-slate-100 p-1">
                  <button
                    type="button"
                    onClick={() => setFormSettings((prev) => ({ ...prev, weightUnit: 'lbs' }))}
                    className={`px-4 py-1.5 rounded-lg text-xs font-bold transition-colors cursor-pointer ${
                      (formSettings.weightUnit || 'kg') === 'lbs'
                        ? 'bg-white text-slate-900 shadow-sm'
                        : 'text-slate-600 hover:text-slate-900'
                    }`}
                  >
                    Libbre (lbs)
                  </button>
                  <button
                    type="button"
                    onClick={() => setFormSettings((prev) => ({ ...prev, weightUnit: 'kg' }))}
                    className={`px-4 py-1.5 rounded-lg text-xs font-bold transition-colors cursor-pointer ${
                      (formSettings.weightUnit || 'kg') === 'kg'
                        ? 'bg-white text-slate-900 shadow-sm'
                        : 'text-slate-600 hover:text-slate-900'
                    }`}
                  >
                    Chilogrammi (kg)
                  </button>
                </div>
              </div>
            </div>

            <button
              type="submit"
              className="w-full min-h-[48px] bg-blue-700 hover:bg-blue-800 text-white font-bold text-base rounded-xl shadow cursor-pointer active:scale-95 transition-all"
            >
              Salva impostazioni
            </button>
          </form>

          {/* Backup, Restore, Sample Data */}
          <div className="bg-white rounded-2xl p-4 shadow-sm border border-slate-200">
            <h3 className="text-base font-extrabold text-slate-900 mb-1">
              Backup dei Dati ed Esportazione Medica
            </h3>
            <p className="text-xs text-slate-500 mb-4">
              Tutte le misurazioni sono salvate privatamente su questo dispositivo. Puoi scaricare in qualsiasi momento un file di backup o un foglio CSV.
            </p>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-2.5 mb-4">
              {/* Export JSON */}
              <button
                type="button"
                onClick={() => exportBackupJSON(records, settings)}
                className="min-h-[48px] px-3 py-2 bg-slate-100 hover:bg-slate-200 text-slate-800 rounded-xl font-bold text-xs sm:text-sm flex items-center justify-center gap-1.5 border border-slate-300 active:scale-95 transition-all cursor-pointer"
              >
                <Download className="w-4 h-4 text-blue-700" />
                <span>Backup (JSON)</span>
              </button>

              {/* Export CSV */}
              <button
                type="button"
                onClick={() => exportRecordsCSV(records, settings)}
                className="min-h-[48px] px-3 py-2 bg-slate-100 hover:bg-slate-200 text-slate-800 rounded-xl font-bold text-xs sm:text-sm flex items-center justify-center gap-1.5 border border-slate-300 active:scale-95 transition-all cursor-pointer"
              >
                <FileSpreadsheet className="w-4 h-4 text-emerald-700" />
                <span>Esporta (CSV)</span>
              </button>

              {/* Import JSON */}
              <button
                type="button"
                onClick={() => fileInputRef.current?.click()}
                className="min-h-[48px] px-3 py-2 bg-slate-100 hover:bg-slate-200 text-slate-800 rounded-xl font-bold text-xs sm:text-sm flex items-center justify-center gap-1.5 border border-slate-300 active:scale-95 transition-all cursor-pointer"
              >
                <Upload className="w-4 h-4 text-purple-700" />
                <span>Ripristina file</span>
              </button>
              <input
                ref={fileInputRef}
                type="file"
                accept=".json"
                onChange={handleFileUpload}
                className="hidden"
              />
            </div>

            <div className="pt-3 border-t border-slate-100 space-y-2">
              <div className="text-xs font-bold text-slate-600">Strumenti di prova e ripristino:</div>

              <div className="flex flex-col sm:flex-row gap-2">
                <button
                  type="button"
                  onClick={handleLoadSampleData}
                  className="min-h-[44px] flex-1 px-3 py-2 bg-amber-50 hover:bg-amber-100 text-amber-900 border border-amber-300 rounded-xl font-bold text-xs sm:text-sm flex items-center justify-center gap-1.5 cursor-pointer"
                >
                  <RefreshCw className="w-4 h-4 text-amber-700" />
                  <span>Carica dati di esempio (14 giorni)</span>
                </button>

                <button
                  type="button"
                  onClick={handleClearAllData}
                  className="min-h-[44px] px-3 py-2 bg-rose-50 hover:bg-rose-100 text-rose-800 border border-rose-300 rounded-xl font-bold text-xs sm:text-sm flex items-center justify-center gap-1.5 cursor-pointer"
                >
                  <Trash2 className="w-4 h-4 text-rose-600" />
                  <span>Cancella tutti i dati</span>
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
