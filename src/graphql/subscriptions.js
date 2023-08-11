/* eslint-disable */
// this is an auto generated file. This will be overwritten

export const onCreateReagent = /* GraphQL */ `
  subscription OnCreateReagent {
    onCreateReagent {
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
export const onUpdateReagent = /* GraphQL */ `
  subscription OnUpdateReagent {
    onUpdateReagent {
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
export const onDeleteReagent = /* GraphQL */ `
  subscription OnDeleteReagent {
    onDeleteReagent {
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
export const onCreateItem = /* GraphQL */ `
  subscription OnCreateItem {
    onCreateItem {
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
export const onUpdateItem = /* GraphQL */ `
  subscription OnUpdateItem {
    onUpdateItem {
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
export const onDeleteItem = /* GraphQL */ `
  subscription OnDeleteItem {
    onDeleteItem {
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
export const onCreateUpdatedItem = /* GraphQL */ `
  subscription OnCreateUpdatedItem {
    onCreateUpdatedItem {
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
export const onUpdateUpdatedItem = /* GraphQL */ `
  subscription OnUpdateUpdatedItem {
    onUpdateUpdatedItem {
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
export const onDeleteUpdatedItem = /* GraphQL */ `
  subscription OnDeleteUpdatedItem {
    onDeleteUpdatedItem {
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
export const onCreateQualityControl = /* GraphQL */ `
  subscription OnCreateQualityControl {
    onCreateQualityControl {
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
export const onUpdateQualityControl = /* GraphQL */ `
  subscription OnUpdateQualityControl {
    onUpdateQualityControl {
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
export const onDeleteQualityControl = /* GraphQL */ `
  subscription OnDeleteQualityControl {
    onDeleteQualityControl {
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
