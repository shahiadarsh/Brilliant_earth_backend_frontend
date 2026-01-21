"use client"

import React, { useEffect } from 'react'
import { useSelection } from '@/context/SelectionContext'
import { useRouter, useParams } from 'next/navigation'
import DiamondSelectionPage from '../../design/diamond/page'

export default function DiamondsLandingFlow() {
    const { setStartType, setCurrentStep, setFilters } = useSelection()
    const { origin } = useParams()
    const router = useRouter()

    useEffect(() => {
        // Handle specific origin if coming from landing links
        if (origin === 'natural' || origin === 'lab') {
            setFilters('diamond', { origin })
        }
        setStartType('diamond')
        setCurrentStep('diamond')
    }, [origin, setStartType, setCurrentStep, setFilters])

    // Reuse the main selection logic
    return <DiamondSelectionPage />
}
