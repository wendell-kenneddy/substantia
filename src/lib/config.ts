const ALL_ENTITY_COLORS = ["red", "green", "blue", "pink", "yellow"] as const;
export type EntityColorTuple = typeof ALL_ENTITY_COLORS;
export type EntityColor = EntityColorTuple[number];

const ALL_ENTITY_SHAPES = ["cube", "pyramid", "sphere"] as const;
export type EntityShapeTuple = typeof ALL_ENTITY_SHAPES;
export type EntityShape = EntityShapeTuple[number];

export const config = {
  MAX_ACTION_POINTS: 99,
  CONSUMED_ACTION_POINTS_ON_ENTITY_REVEAL: 1,
  ELAPSED_TIME_PER_ACTION_POINT_CONSUMED: 2,
  MAX_SPAWNABLE_ENTITIES_PER_GAME: 30,
  ENTITIY_SHAPE_POOL_SIZE: 3,
  ENTITIY_COLOR_POOL_SIZE: 3,
  ENTITY_GRID_COLUMNS: 10,
  ENTITY_GRID_ROWS: 6,
  ALL_ENTITY_COLORS,
  ALL_ENTITY_SHAPES
};
