
import React, { useState } from "react";

const pharmaData = [
  {
    gene: "CYP2C19",
    drug: "Clopidogrel",
    effect: "Poor Metabolizer - Reduced efficacy of the drug",
    recommendation: "Consider alternative antiplatelet therapy or dose adjustment"
  },
  {
    gene: "TPMT",
    drug: "Azathioprine",
    effect: "Low TPMT activity - Increased risk of toxicity",
    recommendation: "Reduce dose or choose alternative immunosuppressant"
  },
  {
    gene: "VKORC1",
    drug: "Warfarin",
    effect: "Increased sensitivity - Lower warfarin dose required",
    recommendation: "Monitor INR closely and adjust dosage accordingly"
  },
  {
    gene: "CYP2D6",
    drug: "Codeine",
    effect: "Ultrarapid Metabolizer - Increased morphine levels, risk of toxicity",
    recommendation: "Avoid codeine; consider non-opioid analgesics"
  },
  {
    gene: "SLCO1B1",
    drug: "Simvastatin",
    effect: "Increased risk of statin-induced myopathy",
    recommendation: "Consider lower dose or alternative statin"
  }
];

export default function App() {
  const [selectedGene, setSelectedGene] = useState("");
  const [selectedDrug, setSelectedDrug] = useState("");
  const [result, setResult] = useState(null);

  const handleSubmit = (e) => {
    e.preventDefault();
    const found = pharmaData.find(
      (item) => item.gene === selectedGene && item.drug === selectedDrug
    );
    setResult(found || { effect: "No data found for this combination", recommendation: "" });
  };

  const genes = [...new Set(pharmaData.map((item) => item.gene))];
  const drugs = [...new Set(pharmaData.map((item) => item.drug))];

  return (
    <div style={styles.container}>
      <header style={styles.header}>
        <h1 style={{ margin: 0, fontWeight: "700" }}>GeneMedAI</h1>
        <p style={{ fontSize: "1.1rem", color: "#666" }}>Personalized Medicine & Pharmacogenomics</p>
      </header>

      <main style={styles.main}>
        <form onSubmit={handleSubmit} style={styles.form}>
          <label style={styles.label}>
            Select Gene Marker:
            <select
              value={selectedGene}
              onChange={(e) => setSelectedGene(e.target.value)}
              required
              style={styles.select}
            >
              <option value="">-- Choose Gene --</option>
              {genes.map((gene) => (
                <option key={gene} value={gene}>
                  {gene}
                </option>
              ))}
            </select>
          </label>

          <label style={styles.label}>
            Select Drug:
            <select
              value={selectedDrug}
              onChange={(e) => setSelectedDrug(e.target.value)}
              required
              style={styles.select}
            >
              <option value="">-- Choose Drug --</option>
              {drugs.map((drug) => (
                <option key={drug} value={drug}>
                  {drug}
                </option>
              ))}
            </select>
          </label>

          <button type="submit" style={styles.button}>
            Check Effect
          </button>
        </form>

        {result && (
          <section style={styles.result}>
            <h2>Result</h2>
            <p><strong>Effect:</strong> {result.effect}</p>
            {result.recommendation && <p><strong>Recommendation:</strong> {result.recommendation}</p>}
          </section>
        )}
      </main>

      <footer style={styles.footer}>
        <small>© 2025 GeneMedAI. All rights reserved.</small>
      </footer>
    </div>
  );
}

const styles = {
  container: {
    fontFamily: "'Segoe UI', Tahoma, Geneva, Verdana, sans-serif",
    minHeight: "100vh",
    display: "flex",
    flexDirection: "column",
    backgroundColor: "#f7f9fc",
    color: "#222",
  },
  header: {
    backgroundColor: "#007bff",
    color: "#fff",
    padding: "1.5rem",
    textAlign: "center",
    boxShadow: "0 2px 8px rgba(0,0,0,0.1)",
  },
  main: {
    flex: 1,
    maxWidth: "600px",
    margin: "2rem auto",
    backgroundColor: "#fff",
    padding: "2rem",
    borderRadius: "10px",
    boxShadow: "0 4px 15px rgba(0,0,0,0.1)",
  },
  form: {
    display: "flex",
    flexDirection: "column",
    gap: "1.5rem",
  },
  label: {
    fontWeight: "600",
    fontSize: "1.1rem",
  },
  select: {
    marginTop: "0.5rem",
    padding: "0.5rem",
    fontSize: "1rem",
    borderRadius: "5px",
    border: "1px solid #ccc",
    width: "100%",
  },
  button: {
    backgroundColor: "#007bff",
    color: "#fff",
    border: "none",
    padding: "0.75rem",
    fontSize: "1.1rem",
    borderRadius: "5px",
    cursor: "pointer",
    transition: "background-color 0.3s ease",
  },
  result: {
    marginTop: "2rem",
    padding: "1rem",
    backgroundColor: "#e9f5ff",
    borderRadius: "8px",
    boxShadow: "inset 0 0 10px #a2d1ff",
  },
  footer: {
    textAlign: "center",
    padding: "1rem",
    backgroundColor: "#f1f1f1",
    color: "#777",
  },
};
