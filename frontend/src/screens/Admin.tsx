import { Navbar } from "../components/shared/Navbar"
import UserAdminSection from '../components/admin/users/UserAdminSection';
import TeamAdminSection from '../components/admin/teams/TeamAdminSection';
import FactionAdminSection from '../components/admin/factions/FactionAdminSection';
import DesireAdminSection from '../components/admin/roles/RoleAdminSection';
import EventsAdminSection from '../components/admin/events/EventsAdminSection'
import { Section } from "../components/shared/Section";
import { useEffect, useState } from "react";
import { getRole } from "../services/requests";
import ExportAdminSection from "../components/admin/export/ExportAdminSection";

export const Admin = () => {

    const [role, setRole] = useState<string | null>(null);

    useEffect(() => {
        const fetchRole = async () => {
            try {
                const role = await getRole();
                if (role !== ("Admin"|| "RespoCE")) {
                    window.location.href = '/Home';
                    return null;
                }
                setRole(role);
                
            } catch (error) {
                console.error('Error fetching role:', error);
            }
        };

        fetchRole();
    }, []);

    return (
        <div className="Admin">
            <Navbar />
            {(role === 'Admin') && <Section titre="Utilisateurs" contenu={UserAdminSection} />}
            {(role === ('Admin' || 'RespoCE')) && <Section titre="Equipes" contenu={TeamAdminSection} />}
            {(role === ('Admin' || 'RespoCE')) && <Section titre="Factions" contenu={FactionAdminSection} />}
            {(role === 'Admin') &&<Section titre="Rôles" contenu={DesireAdminSection} />}
            {(role === 'Admin') && <Section titre="Events" contenu={EventsAdminSection} />}
            {(role === 'Admin') && <Section titre="Exports" contenu={ExportAdminSection} />}
        </div>
    )
}