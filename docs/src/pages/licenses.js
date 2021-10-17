import React, { useEffect, useState } from 'react';
import Layout from '@theme/Layout';

function capitalizeFirstLetter(string) {
  return string.charAt(0).toUpperCase() + string.slice(1);
}

export default function Licenses() {
  const [tech, setTech] = useState('');
  const [licenses, setLicenses] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const url = new URL(window.location.href);
    const tech = url.searchParams.get('tech');
    setTech(tech);
    fetch(`licenses-${tech}.json`)
      .then((res) => res.text())
      .then((data) => {
        setLicenses(Object.values(JSON.parse(data)));
        setLoading(false);
      });
  }, []);

  return (
    <Layout
      title={`Licenses`}
      description="LOCA Open Source License Notice">
      <h1>LOCA {capitalizeFirstLetter(tech)} Open Source License Notice</h1>
      {loading && <h2>Loading...</h2>}
      {licenses.map(license => (
        <div>
          <h2>{license.name}</h2>
          <p>{license.licenseText}</p>
        </div>
      ))}
    </Layout>
  );
}
