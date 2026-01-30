import api from './api'

export const getDashboardSummary=()=>{
    return api.get("/api/dashboard/summary");
}