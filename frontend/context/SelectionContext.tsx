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
}

interface SelectionContextType {
    selectedSetting: SelectedSetting | null
    selectedDiamond: SelectedDiamond | null
    setSetting: (setting: SelectedSetting | null) => void
    setDiamond: (diamond: SelectedDiamond | null) => void
    clearSelection: () => void
    currentStep: 'setting' | 'diamond' | 'gemstone' | 'review'
    setCurrentStep: (step: 'setting' | 'diamond' | 'gemstone' | 'review') => void
    startType: 'setting' | 'diamond' | 'gemstone' | null
    setStartType: (type: 'setting' | 'diamond' | 'gemstone' | null) => void

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
    const [currentStep, setCurrentStep] = useState<'setting' | 'diamond' | 'gemstone' | 'review'>('setting')
    const [startType, setStartType] = useState<'setting' | 'diamond' | 'gemstone' | null>(null)
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
            setSetting,
            setDiamond,
            clearSelection,
            currentStep,
            setCurrentStep,
            startType,
            setStartType,
            filters,
            setFilters
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
