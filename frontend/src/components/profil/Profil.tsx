import React, { useEffect, useState } from 'react';
import { getCurrentUser, updateUser } from '../../services/requests/users';
import { handleError } from '../utils/Submit';
import { ToastContainer, toast } from 'react-toastify';
import './Profil.css';
import { Faction, Team } from '../../services/interfaces';
import { getAllMembersTeam, getTeam } from '../../services/requests/teams';
import { getFaction } from '../../services/requests/factions';

export const ProfilForm: React.FC = () => {
    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [email, setEmail] = useState('');
    const [branch, setBranch] = useState('');
    const [birthday, setBirthday] = useState('');
    const [contact, setContact] = useState('');
    const [discord_id, setDiscordId] = useState('');

    useEffect(() => {
        const fetchUserData = async () => {
          try {
            const currentUser = await getCurrentUser();
            setFirstName(currentUser.first_name);
            setLastName(currentUser.last_name);
            setEmail(currentUser.email);
            setBranch(currentUser.branch);
            setBirthday(currentUser.birthday);
            setContact(currentUser.contact);
            setDiscordId(currentUser.discord_id);
          } catch (error) {
            toast.error('Erreur lors de la récupération du profil. Veuillez réessayer plus tard.');
          }
        };
    
        fetchUserData();
      }, []);

    const handleSubmit = async (event: React.FormEvent) => {
        event.preventDefault();
        try {
            handleError("Profil mis à jour avec succès !", "Une erreur est survenue", updateUser, contact, discord_id);
        } catch (error) {
            toast.error('Erreur lors de la mise à jour du profil. Veuillez réessayer plus tard.');
        }
    };

    return (
        <div className="profil-form-container">
            <p style={{textAlign: "center"}}>Si tu as le moindre soucis avec ton profil n'hésite pas à contacter : integration@utt.fr</p>
            <form onSubmit={handleSubmit} className="form-group">
                <label>
                    Prénom:
                    <input
                        type="text"
                        placeholder={firstName}
                        value={firstName}
                        onChange={(e) => setFirstName(e.target.value)}
                        required
                        disabled
                    />
                </label>
                <label>
                    Nom:
                    <input
                        type="text"
                        placeholder={lastName}
                        value={lastName}
                        onChange={(e) => setLastName(e.target.value)}
                        required
                        disabled
                    />
                </label>
                <label>Email:</label>
                <p>Si tu souhaites changer ton email contacte : integration@utt.fr</p>
                    <input
                        type="text"
                        placeholder={email}
                        value={email}
                        disabled
                    />
                <label>
                    Date de naissance:
                    <input
                        type="date"
                        value={birthday}
                        placeholder={birthday}
                        onChange={(e) => setBirthday(e.target.value)}
                        disabled
                    />
                </label>
                <label>Ta branche:</label>
                    <input
                        type="text"
                        placeholder={branch}
                        value={branch}
                        disabled
                    />
                <label>Discord Tag (Pour rejoindre le discord de l'intégration et être affecté à ton équipe !):</label>
                    <input
                        type="text"
                        value={discord_id}
                        placeholder={discord_id}
                        onChange={(e) => setDiscordId(e.target.value)}
                    />
                <label>
                    Tes moyens de contact (tu peux en mettre plusieurs 😊):
                    <textarea
                        value={contact}
                        placeholder="Entre tes moyens de contact ici..."
                        onChange={(e) => setContact(e.target.value)}
                    />
                </label>
                <button type="submit" className="button-36">Mettre à jour</button>
            </form>
            <ToastContainer position="bottom-right" />
        </div>
    );
};

export const TeamDisplay: React.FC = () => {
    
    const [userTeam, setTeam] = useState<Team>();
    const [teamMembers, setTeamMembers] = useState([]);
    const [userFaction, setFaction] = useState<Faction>();

    useEffect(() => {
        const fetchUserTeamData = async () => {
            try {
                const currentUser = await getCurrentUser();
                const team = await getTeam(currentUser.team_id);
                setTeam(team);
                if (team) {
                    setFaction(await getFaction(team.faction));
                    setTeamMembers(await getAllMembersTeam(team.id))
                }

            } catch (error) {
                console.error('Error fetching data:', error);
            }
        };
        fetchUserTeamData();
    }, []);    

    return (
        <>
            <div className='containerTeam'>
                <div className='affichageTeam'>
                    <h3 id='msgTeams'> { userTeam?.name ? userTeam.name : "Tu n'as pas d'équipe d'attribuée pour l'instant"}</h3>
                        {teamMembers?.length !== 0 ? (
                            teamMembers?.map((member : any) => (
                               <p key={member.id}>{member.first_name +' '+ member.last_name}</p>
                            ))
                        ) : (
                            <p>Tu n'as pas de coéquipier pour l'instant</p>
                        )}
                </div>
                <div className='affichageFaction'>
                    <h3 id='msgFaction'>Ta faction</h3>
                    <p id='nameFaction'>{userFaction?.name}</p>
                </div>
            </div>
        </>
    );
};

