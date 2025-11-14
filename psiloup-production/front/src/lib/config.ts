// API Client para backend PsiloUp
import { apiClient } from "./api-client"

// Export para compatibilidade (será removido gradualmente)
export const sdk = {
  client: {
    fetch: async <T>(url: string, options?: any): Promise<{ data: T }> => {
      const method = options?.method || 'GET';
      const body = options?.body;
      
      let data: T;
      if (method === 'GET') {
        data = await apiClient.get<T>(url);
      } else if (method === 'POST') {
        data = await apiClient.post<T>(url, body);
      } else if (method === 'PUT') {
        data = await apiClient.put<T>(url, body);
      } else if (method === 'DELETE') {
        data = await apiClient.delete<T>(url);
      } else {
        throw new Error(`Unsupported method: ${method}`);
      }
      
      return { data };
    },
  },
}

export { apiClient }
