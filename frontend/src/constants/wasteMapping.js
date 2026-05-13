export const WASTE_MAPPING = {
    'Plastic': {
        color: 'blue',
        hex: '#3b82f6',
        emoji: '🧴',
        binType: 'Dry Waste',
        explanation: 'Plastic materials take centuries to decompose and can break down into harmful microplastics.',
        instructions: 'Rinse and dry before disposal. Remove caps and labels if possible.',
        ecoTip: 'Recycling 1 ton of plastic saves 5.7 cubic meters of landfill space.'
    },
    'Organic': {
        color: 'green',
        hex: '#10b981',
        emoji: '🌿',
        binType: 'Wet Waste',
        explanation: 'Biodegradable organic matter that can be naturally processed into nutrient-rich compost.',
        instructions: 'Compost food scraps and garden waste. Avoid non-biodegradable bags.',
        ecoTip: 'Organic waste in landfills produces methane, a potent greenhouse gas.'
    },
    'Paper': {
        color: 'blue',
        hex: '#6366f1',
        emoji: '📄',
        binType: 'Dry Waste',
        explanation: 'Paper fibers can be recycled multiple times to create new paper products.',
        instructions: 'Keep dry and flat. Remove plastic windows from envelopes.',
        ecoTip: 'Recycling paper saves 17 trees for every ton of paper recycled.'
    },
    'Metal': {
        color: 'blue',
        hex: '#f59e0b',
        emoji: '🥫',
        binType: 'Dry Waste',
        explanation: 'Metals are highly valuable and can be recycled infinitely without losing quality.',
        instructions: 'Clean food residue from cans. Crush to save space.',
        ecoTip: 'Aluminium can be recycled indefinitely without losing its quality.'
    },
    'E-Waste': {
        color: 'black',
        hex: '#374151',
        emoji: '💻',
        binType: 'Hazardous Waste',
        explanation: 'Electronic devices contain heavy metals that can be toxic if not processed correctly.',
        instructions: 'Do not throw in regular bins. Bring to specialized collection centers.',
        ecoTip: 'E-waste contains valuable metals like gold, silver, and copper.'
    },
    'Glass': {
        color: 'blue',
        hex: '#0ea5e9',
        emoji: '🍾',
        binType: 'Dry Waste',
        explanation: 'Glass is 100% recyclable and is melted down to form new containers.',
        instructions: 'Handle with care. Segregate by color (clear, green, brown).',
        ecoTip: 'Glass is 100% recyclable and can be reused infinitely.'
    },
    'Hazardous': {
        color: 'black',
        hex: '#1f2937',
        emoji: '⚠️',
        binType: 'Hazardous Waste',
        explanation: 'Toxic or reactive materials that require special handling to prevent environmental damage.',
        instructions: 'Dispose of through municipal hazardous waste programs.',
        ecoTip: 'Improper disposal of hazardous waste can contaminate groundwater.'
    },
    'Cardboard': {
        color: 'blue',
        hex: '#3b82f6',
        emoji: '📦',
        binType: 'Dry Waste',
        explanation: 'Sturdy paper material that is easily recycled into new boxes or paperboard.',
        instructions: 'Flatten boxes to save space. Remove all packing tape and shipping labels.',
        ecoTip: 'Recycling cardboard takes 24% less energy and produces 50% less sulfur dioxide.'
    },
    'Trash': {
        color: 'black',
        hex: '#1f2937',
        emoji: '🗑️',
        binType: 'Hazardous Waste',
        explanation: 'Non-recyclable or mixed materials that must be safely contained.',
        instructions: 'Ensure no recyclable materials are included. Bag securely.',
        ecoTip: 'Reducing overall waste is the most effective way to help the environment.'
    }
};

export const getWasteDetails = (type) => {
    return WASTE_MAPPING[type] || WASTE_MAPPING['Plastic'];
};
