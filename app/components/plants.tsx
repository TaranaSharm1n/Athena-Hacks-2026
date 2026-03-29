export type PlantType = {
  id: string
  name: string
  stages: string[] // array of 6 image paths
}

export const PLANT_TYPES: PlantType[] = [
    {
    id: "cherry-blossoms",
    name: "Cherry Blossoms",
    stages:
        [
            "/plants/Pot.png",
            "/plants/Cherrys2.png",
            "/plants/Cherrys3.png",
            "/plants/Cherrys4.png", 
            "/plants/Cherrys5.png",
            "/plants/Cherrys6.png",
        ],
    },  
]

export function getPlantImage(plantTypeId: string, stage: number): string {
    const plantType = PLANT_TYPES.find(p => p.id === plantTypeId)
    if (!plantType) return "/plants/pot.png"
    const index = Math.min(Math.max(stage - 1, 0), plantType.stages.length - 1)
    return plantType.stages[index]
}
