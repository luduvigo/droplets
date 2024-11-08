import { useState, useCallback } from "react";

const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL;

export interface Vault {
  _id?: string;
  name: string;
  ownerAddress: string;
  vaultAddress: string;
  imageUrl?: string;
  backers: { address: string }[];
}

interface VaultsResponse {
  vaults: Vault[];
  count: number;
}

export function useVaultApi() {
  const [vaults, setVaults] = useState<Vault[]>([]);
  const [vault, setVault] = useState<Vault | null>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  // Fetch all vaults
  const fetchVaults = useCallback(async () => {
    setLoading(true);
    setError(null);

    try {
      const response = await fetch(`${API_BASE_URL}`);
      if (!response.ok) throw new Error(`Error: ${response.statusText}`);

      const data: VaultsResponse = await response.json();
      setVaults(data.vaults);
    } catch (err: any) {
      setError(err.toString());
    } finally {
      setLoading(false);
    }
  }, []);

  // Fetch a single vault by ID
  const fetchVaultById = useCallback(async (id: string) => {
    setLoading(true);
    setError(null);

    try {
      const response = await fetch(`${API_BASE_URL}/${id}`);
      if (!response.ok) throw new Error(`Error: ${response.statusText}`);

      const data: Vault = await response.json();
      setVault(data);
    } catch (err: any) {
      setError(err.toString());
    } finally {
      setLoading(false);
    }
  }, []);

  // Create a new vault
  const createVault = useCallback(async (newVault: Vault) => {
    setLoading(true);
    setError(null);

    try {
      const response = await fetch(`${API_BASE_URL}`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(newVault),
      });
      if (!response.ok) throw new Error(`Error: ${response.statusText}`);

      const data: Vault = await response.json();
      setVaults((prevVaults) => [...prevVaults, data]);
      return data;
    } catch (err: any) {
      setError(err.toString());
      throw err;
    } finally {
      setLoading(false);
    }
  }, []);

  // Update an existing vault by ID
  const updateVault = useCallback(
    async (id: string, updatedVault: Partial<Vault>) => {
      setLoading(true);
      setError(null);

      try {
        const response = await fetch(`${API_BASE_URL}/${id}`, {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(updatedVault),
        });
        if (!response.ok) throw new Error(`Error: ${response.statusText}`);

        const data: Vault = await response.json();
        setVaults((prevVaults) =>
          prevVaults.map((v) => (v._id === id ? data : v))
        );
        return data;
      } catch (err: any) {
        setError(err.toString());
        throw err;
      } finally {
        setLoading(false);
      }
    },
    []
  );

  return {
    vaults,
    vault,
    loading,
    error,
    fetchVaults,
    fetchVaultById,
    createVault,
    updateVault,
  };
}
