export interface PaymentOptions {
  driver: 'stripe'
}

export type PaymentConfig = Partial<PaymentOptions>

export interface ChargeOptions {
  currency?: string
  source?: string
  description?: string
  chargeId?: string
  limit?: number
  metadata?: object
  searchOptions: {
    query?: string
    limit?: number
  }
}

export interface CustomerOptions {
  description?: string
  address?: string
  email?: string
  metadata?: object
  name?: string
  payment_method?: string
  shipping: string
  listOptions?: {
    created?: object
    ending_before?: string
    limit?: number
    starting_after?: string
    test_clock?: string
  }
  searchOptions?: {
    query?: string
    limit?: number
    page?: number
  }
}

export interface DisputeOptions {
  dp_id?: string
  metadata?: object
  listOptions?: {
    charge?: string
    payment_intent?: string
    created?: string
    ending_before?: string
    limit?: number
    starting_after?: string
  }
}

export interface EventOptions {
  event_id?: string
  listOptions?: {
    created?: object
    delivery_success?: boolean
    ending_before?: string
    limit?: number
    starting_after?: string
    type?: string
  }
}
