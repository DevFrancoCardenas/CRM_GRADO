import { IonChip } from '@ionic/react';
export default function BadgeBool({ value, si = "SI", no = "NO" }) {
  if (value)
    return (
      <IonChip color="success">{si}</IonChip>
    )
  return (
    <IonChip color="danger">{no}</IonChip>
  )
}
