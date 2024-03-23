import { api } from '../api';

export const createTeam = async (name: string) => {
    return await api.post('team', { name })
}

export const deleteTeam = async (id: number) => {
    return await api.delete('team/' + id)
}

export const addToFaction = async (teamIds: number[], factionId: number) => {
    await api.put('team/addtofaction', {
        teamIds,
        factionId,
    })
}