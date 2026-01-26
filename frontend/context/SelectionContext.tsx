"use client"

import React, { createContext, useContext, useState, useEffect } from 'react'

export interface SelectedSetting {
    id: string | number
    name: string
    price: number
    image: string
    metal: string
}

export interface SelectedDiamond {
    id: string | number
    name: string
    price: number
    image: string
    type: 'natural' | 'lab' | 'gemstone'
    shape?: string
    carat?: number
    cut?: string
    color?: string
    clarity?: string
}

export interface SelectedBridalSet {
    id: string | number
    name: string
    engagementRing: string
    weddingBand: string
    price: number
    image: string
    metal: string
}

interface SelectionContextType {
    selectedSetting: SelectedSetting | null
    selectedDiamond: SelectedDiamond | null
    selectedBridalSet: SelectedBridalSet | null
    setSetting: (setting: SelectedSetting | null) => void
    setDiamond: (diamond: SelectedDiamond | null) => void
    setBridalSet: (bridalSet: SelectedBridalSet | null) => void
    clearSelection: () => void
    currentStep: 'setting' | 'diamond' | 'gemstone' | 'review'
    setCurrentStep: (step: 'setting' | 'diamond' | 'gemstone' | 'review') => void
    startType: 'setting' | 'diamond' | 'gemstone' | 'bridal-set' | null
    setStartType: (type: 'setting' | 'diamond' | 'gemstone' | 'bridal-set' | null) => void
    addToCart: (item: any) => void

    // Filters
    filters: {
        setting: { style: string[]; metal: string[] }
        diamond: { shape: string[]; origin: string; priceRange: [number, number]; caratRange: [number, number] }
        gemstone: { color: string[]; shape: string[] }
    }
    setFilters: (type: 'setting' | 'diamond' | 'gemstone', newFilters: any) => void
}

const SelectionContext = createContext<SelectionContextType | undefined>(undefined)

export function SelectionProvider({ children }: { children: React.ReactNode }) {
    const [selectedSetting, setSelectedSetting] = useState<SelectedSetting | null>(null)
    const [selectedDiamond, setSelectedDiamond] = useState<SelectedDiamond | null>(null)
    const [selectedBridalSet, setSelectedBridalSet] = useState<SelectedBridalSet | null>(null)
    const [currentStep, setCurrentStep] = useState<'setting' | 'diamond' | 'gemstone' | 'review'>('setting')
    const [startType, setStartType] = useState<'setting' | 'diamond' | 'gemstone' | 'bridal-set' | null>(null)
    const [filters, setFiltersState] = useState<SelectionContextType['filters']>({
        setting: { style: [], metal: [] },
        diamond: { shape: [], origin: 'natural', priceRange: [180, 500000], caratRange: [0.25, 20.45] },
        gemstone: { color: [], shape: [] }
    })

    const setFilters = (type: 'setting' | 'diamond' | 'gemstone', newFilters: any) => {
        setFiltersState(prev => ({
            ...prev,
            [type]: { ...prev[type], ...newFilters }
        }))
    }

    const addToCart = (item: any) => {
        // Store in localStorage for cart page
        const cart = JSON.parse(localStorage.getItem('cart') || '[]')
        cart.push(item)
        localStorage.setItem('cart', JSON.stringify(cart))
    }

    // Sync with local storage to persist the flow
    useEffect(() => {
        const saved = localStorage.getItem('ritzin_selection')
        if (saved) {
            try {
                const data = JSON.parse(saved)
                setSelectedSetting(data.selectedSetting)
                setSelectedDiamond(data.selectedDiamond)
                setCurrentStep(data.currentStep)
                setStartType(data.startType)
                if (data.filters) setFiltersState(data.filters)
            } catch (e) {
                console.error("Failed to parse selection data", e)
            }
        }
    }, [])

    useEffect(() => {
        localStorage.setItem('ritzin_selection', JSON.stringify({
            selectedSetting,
            selectedDiamond,
            currentStep,
            startType,
            filters
        }))
    }, [selectedSetting, selectedDiamond, currentStep, startType, filters])

    const setSetting = (setting: SelectedSetting | null) => {
        setSelectedSetting(setting)
        if (setting) {
            // Logic for auto-advancing if needed could go here
        }
    }

    const setDiamond = (diamond: SelectedDiamond | null) => {
        setSelectedDiamond(diamond)
        if (diamond) {
            // Logic for auto-advancing if needed could go here
        }
    }

    const clearSelection = () => {
        setSelectedSetting(null)
        setSelectedDiamond(null)
        setCurrentStep('setting')
        setStartType(null)
        localStorage.removeItem('ritzin_selection')
    }

    return (
        <SelectionContext.Provider value={{
            selectedSetting,
            selectedDiamond,
            selectedBridalSet,
            setSetting,
            setDiamond,
            setBridalSet: setSelectedBridalSet,
            clearSelection,
            currentStep,
            setCurrentStep,
            startType,
            setStartType,
            filters,
            setFilters,
            addToCart
        }}>
            {children}
        </SelectionContext.Provider>
    )
}

export function useSelection() {
    const context = useContext(SelectionContext)
    if (context === undefined) {
        throw new Error('useSelection must be used within a SelectionProvider')
    }
    return context
}
