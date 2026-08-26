import { useEffect, useState } from 'react'
import { fetchCollection } from '../api.js'
import { DataState, ResourcePage } from './ResourcePage.jsx'
import { formatDate } from './formatters.js'

export default function Activities() {
  const { data, loading, error } = useResource('activities')
  return <ResourcePage title="Activity log" intro="Recent movement from across the OctoFit community.">
    <DataState loading={loading} error={error} empty={!data.length} />
    {!loading && !error && data.length > 0 && <div className="table-responsive"><table className="table align-middle"><thead><tr><th>Activity</th><th>Duration</th><th>Distance</th><th>Points</th><th>Completed</th></tr></thead><tbody>{data.map((activity) => <tr key={activity._id}><td className="fw-semibold text-capitalize">{activity.type}</td><td>{activity.durationMinutes} min</td><td>{activity.distanceKm ? `${activity.distanceKm} km` : '-'}</td><td><span className="score">+{activity.points}</span></td><td>{formatDate(activity.completedAt)}</td></tr>)}</tbody></table></div>}
  </ResourcePage>
}

function useResource(resource) { const [state, setState] = useState({ data: [], loading: true, error: '' }); useEffect(() => { const controller = new AbortController(); fetchCollection(resource, controller.signal).then((data) => setState({ data, loading: false, error: '' })).catch((error) => { if (error.name !== 'AbortError') setState({ data: [], loading: false, error: error.message }) }); return () => controller.abort() }, [resource]); return state }