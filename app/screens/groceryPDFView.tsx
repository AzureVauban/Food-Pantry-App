import React, { forwardRef } from 'react';

type GroceryItemType = {
  name: string;
  quantity: number;
  purchased: boolean;
};

type GroceryPDFViewProps = {
  listTitle: string;
  items: GroceryItemType[];
};

const GroceryPDFView = forwardRef<HTMLDivElement, GroceryPDFViewProps>(
  ({ listTitle, items }, ref) => {
    return (
      <div
        ref={ref}
        style={{
          fontFamily: 'sans-serif',
          color: '#000',
          margin: 0,
          padding: 0,
        }}
      >
        <ul style={{ listStyle: 'none', padding: 0, margin: 0 }}>
          {items.map((item, index) => (
            <li
              key={index}
              style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                marginBottom: '8px',
                textDecoration: item.purchased ? 'line-through' : 'none',
                opacity: item.purchased ? 0.6 : 1,
                fontSize: '16px',
              }}
            >
              <span style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                <input type="checkbox" checked={item.purchased} readOnly />
                {item.name}
              </span>
              <span style={{ color: 'green', fontWeight: 'bold', minWidth: '20px', textAlign: 'right' }}>
                {item.quantity}
              </span>
            </li>
          ))}
        </ul>
      </div>
    );
  }
);

export default GroceryPDFView;

