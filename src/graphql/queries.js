/* eslint-disable */
// this is an auto generated file. This will be overwritten

export const getReagent = /* GraphQL */ `
  query GetReagent($id: ID!) {
    getReagent(id: $id) {
      id
      name
      qualityControlInterval
      item {
        items {
          id
          reagentID
          lot
          expirationDate
          receivedDate
          initialQuantity
          currentQuantity
          createdAt
          updatedAt
        }
        nextToken
      }
      createdAt
      updatedAt
    }
  }
`;
export const listReagents = /* GraphQL */ `
  query ListReagents(
    $filter: ModelReagentFilterInput
    $limit: Int
    $nextToken: String
  ) {
    listReagents(filter: $filter, limit: $limit, nextToken: $nextToken) {
      items {
        id
        name
        qualityControlInterval
        item {
          nextToken
        }
        createdAt
        updatedAt
      }
      nextToken
    }
  }
`;
export const getItem = /* GraphQL */ `
  query GetItem($id: ID!) {
    getItem(id: $id) {
      id
      reagentID
      reagent {
        id
        name
        qualityControlInterval
        item {
          nextToken
        }
        createdAt
        updatedAt
      }
      lot
      expirationDate
      receivedDate
      initialQuantity
      currentQuantity
      updates {
        items {
          id
          itemID
          addedOrRemoved
          dateUpdated
          quantity
          comment
          createdAt
          updatedAt
        }
        nextToken
      }
      qualityControl {
        items {
          id
          itemID
          datePerformed
          performedBy
          comment
          createdAt
          updatedAt
        }
        nextToken
      }
      createdAt
      updatedAt
    }
  }
`;
export const listItems = /* GraphQL */ `
  query ListItems(
    $filter: ModelItemFilterInput
    $limit: Int
    $nextToken: String
  ) {
    listItems(filter: $filter, limit: $limit, nextToken: $nextToken) {
      items {
        id
        reagentID
        reagent {
          id
          name
          qualityControlInterval
          createdAt
          updatedAt
        }
        lot
        expirationDate
        receivedDate
        initialQuantity
        currentQuantity
        updates {
          nextToken
        }
        qualityControl {
          nextToken
        }
        createdAt
        updatedAt
      }
      nextToken
    }
  }
`;
export const getUpdatedItem = /* GraphQL */ `
  query GetUpdatedItem($id: ID!) {
    getUpdatedItem(id: $id) {
      id
      itemID
      addedOrRemoved
      dateUpdated
      quantity
      comment
      createdAt
      updatedAt
    }
  }
`;
export const listUpdatedItems = /* GraphQL */ `
  query ListUpdatedItems(
    $filter: ModelUpdatedItemFilterInput
    $limit: Int
    $nextToken: String
  ) {
    listUpdatedItems(filter: $filter, limit: $limit, nextToken: $nextToken) {
      items {
        id
        itemID
        addedOrRemoved
        dateUpdated
        quantity
        comment
        createdAt
        updatedAt
      }
      nextToken
    }
  }
`;
export const getQualityControl = /* GraphQL */ `
  query GetQualityControl($id: ID!) {
    getQualityControl(id: $id) {
      id
      itemID
      datePerformed
      performedBy
      comment
      createdAt
      updatedAt
    }
  }
`;
export const listQualityControls = /* GraphQL */ `
  query ListQualityControls(
    $filter: ModelQualityControlFilterInput
    $limit: Int
    $nextToken: String
  ) {
    listQualityControls(filter: $filter, limit: $limit, nextToken: $nextToken) {
      items {
        id
        itemID
        datePerformed
        performedBy
        comment
        createdAt
        updatedAt
      }
      nextToken
    }
  }
`;
